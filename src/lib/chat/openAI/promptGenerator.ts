import { getPromptConfig } from "@/lib/methodic-data/getPromptConfig";
import { prisma } from "@/lib/prisma";
import { getSchoolById } from "@/lib/profile/getSchoolById";
import { getUserInfo } from "@/lib/profile/getUserInfo";
import { getLocale } from "next-intl/server";

export async function generatePrompt(code: string): Promise<string> {
  try {
    // Fetch the job with all related data using Prisma
    const jobData = await prisma.methodic_jobs.findUnique({
      where: {
        job_id: code,
      },
      include: {
        abilities: {
          orderBy: {
            importance: "desc",
          },
          take: 5,
        },
        activities: {
          orderBy: {
            importance: "desc",
          },
          take: 5,
        },
        knowledge: {
          orderBy: {
            importance: "desc",
          },
          take: 5,
        },
        skills: true,
        specs: {
          include: {
            spec: {
              include: {
                specs_univers: {
                  include: {
                    univers: true,
                  },
                  where: {
                    count_grant_gen_2023: {
                      gte: 5,
                    },
                  },
                },
              },
            },
          },
        },
        tasks: {
          orderBy: {
            importance: "desc",
          },
          take: 5,
        },
        technology: true,
        tools: true,
        values: {
          orderBy: {
            percent: "desc",
          },
          take: 5,
        },
      },
    });

    if (!jobData) {
      throw new Error("No matching record found");
    }

    // Process job data
    const processedJobData = {
      ...jobData,
      median_wage: processMedianWage(jobData.median_wage),
      job_openings: processNumber(jobData.job_openings),
      emloyees: processNumber(jobData.emloyees),
      abilities: jobData.abilities.map((a) =>
        a.abilities?.replace(/ Related occupations$/, "")
      ),
      activities: jobData.activities.map((a) =>
        a.activity?.replace(/ Related occupations$/, "")
      ),
      knowledge: jobData.knowledge.map((k) =>
        k.knowledge?.replace(/ Related occupations$/, "")
      ),
      skills: jobData.skills.map((s) =>
        s.skill?.replace(/ Related occupations$/, "")
      ),
      tasks: jobData.tasks.map((t) =>
        t.task?.replace(/ Related occupations$/, "")
      ),
      technology: jobData.technology.map((t) => {
        const techString = t.value || "";
        const index = techString.indexOf(",/");
        return index !== -1 ? techString.substring(0, index) : techString;
      }),
      tools: jobData.tools.map((t) =>
        t.tools?.replace(/ Related occupations$/, "")
      ),
      values: jobData.values.map((v) =>
        v.value?.replace(/ Related occupations$/, "")
      ),
      specs: jobData.specs.map((s) => ({
        code: s.spec?.code,
        group_name: s.spec?.group_name,
        name: s.spec?.name,
        subjects: s.spec?.subjects,
        count: s.spec?.count,
        universities: s.spec?.specs_univers.map((su) => ({
          name_ru: su.univers?.name_ru,
          abbreviation: su.univers?.abbreviation,
          code: su.univers?.code,
          address: su.univers?.address,
          region_name: su.univers?.region_name,
          university_type: su.univers?.university_type,
          website: su.univers?.website,
          social: su.univers?.social,
          phone1: su.univers?.phone1,
          phone2: su.univers?.phone2,
          is_english_available: su.is_english_available,
          min_grant: su.min_grant,
          min_point_gen_2023: su.min_point_gen_2023,
          count_grant_gen_2023: su.count_grant_gen_2023,
          min_point_aul_2023: su.min_point_aul_2023,
          count_grant_aul_2023: su.count_grant_aul_2023,
          teacher_quota: su.univers?.teacher_quota,
          serpin_quota: su.univers?.serpin_quota,
          military_factory: su.univers?.military_factory,
          dormitory: su.univers?.dormitory,
        })),
      })),
    };

    const promptLines: string[] = [];
    const userInfo = await getUserInfo();
    promptLines.push("**Info about student:**");

    if (userInfo) {
      promptLines.push(`
          Age: ${userInfo.age}
          Grade: ${userInfo.grade}
      `);
    }

    if (userInfo?.schoolId) {
      const schoolName = await getSchoolById(userInfo?.schoolId);
      if (schoolName) {
        promptLines.push(`School: ${schoolName?.name_ru}`);
      }
    }

    // Occupation and Industry Group
    promptLines.push(`**Career Overview: ${processedJobData.name}**\n`);
    promptLines.push(`**Occupation:** ${processedJobData.name}`);
    promptLines.push(`**Industry Group:** ${processedJobData.group_name}`);
    if (processedJobData.featured) {
      promptLines.push(
        `**Featured Occupation:** This occupation is gaining popularity.`
      );
    }

    promptLines.push(`\n---\n`);

    // Education and Preparation Needed
    const prepLevelDescriptions: { [key: string]: string } = {
      "1": "No preparation needed",
      "2": "Low preparation needed",
      "3": "Medium preparation needed",
      "4": "Good preparation needed",
      "5": "Extensive preparation needed",
    };

    const prepNeededDescription =
      prepLevelDescriptions[processedJobData.prep_needed || ""] ||
      "Unknown preparation level";

    const promtConfig = await getPromptConfig();

    if (promtConfig.length !== 0) {
      promptLines.push(promtConfig[0].config_value);
    }

    const locale = await getLocale();

    if (locale === "kz") {
      promptLines.push("Return your response in kazakh");
    } else {
      promptLines.push("Return your response in russian");
    }

    promptLines.push(
      `Return text very short. Just most important moments. It is very important. Text should be super short. only most imporant moments.`
    );
    promptLines.push(`**Education and Preparation Needed:**\n`);
    promptLines.push(
      `This occupation requires a **${prepNeededDescription}**.`
    );

    if (processedJobData.education) {
      promptLines.push(`- **Education:** ${processedJobData.education}`);
    }
    if (processedJobData.related_experience) {
      promptLines.push(
        `- **Related Experience:** ${processedJobData.related_experience}`
      );
    }
    if (processedJobData.job_training) {
      promptLines.push(`- **Job Training:** ${processedJobData.job_training}`);
    }

    promptLines.push(`\n---\n`);

    // Income and Employment Outlook
    promptLines.push(`**Income and Employment Outlook:**\n`);
    if (
      processedJobData.median_wage !== undefined &&
      processedJobData.median_wage !== null
    ) {
      promptLines.push(
        `- **Median Wage:** Approximately **${processedJobData.median_wage} Kazakhstani Tenge**.`
      );
    }
    if (processedJobData.employment_growth) {
      promptLines.push(
        `- **Employment Growth:** ${processedJobData.employment_growth}`
      );
    }
    if (
      processedJobData.job_openings !== undefined &&
      processedJobData.job_openings !== null
    ) {
      promptLines.push(
        `- **Job Openings:** About **${processedJobData.job_openings}** positions available.`
      );
    }
    if (
      processedJobData.emloyees !== undefined &&
      processedJobData.emloyees !== null
    ) {
      promptLines.push(
        `- **Number of Employees:** Around **${processedJobData.emloyees}** individuals are employed in this occupation.`
      );
    }

    promptLines.push(`\n---\n`);

    // Abilities
    if (
      Array.isArray(processedJobData.abilities) &&
      processedJobData.abilities.length > 0
    ) {
      promptLines.push(`**Key Abilities:**\n`);
      processedJobData.abilities.forEach((ability) => {
        if (ability) promptLines.push(`- ${ability}`);
      });
      promptLines.push(`\n---\n`);
    }

    // Activities
    if (
      Array.isArray(processedJobData.activities) &&
      processedJobData.activities.length > 0
    ) {
      promptLines.push(`**Main Activities:**\n`);
      processedJobData.activities.forEach((activity) => {
        if (activity) promptLines.push(`- ${activity}`);
      });
      promptLines.push(`\n---\n`);
    }

    // Knowledge Areas
    if (
      Array.isArray(processedJobData.knowledge) &&
      processedJobData.knowledge.length > 0
    ) {
      promptLines.push(`**Essential Knowledge Areas:**\n`);
      processedJobData.knowledge.forEach((knowledge) => {
        if (knowledge) promptLines.push(`- ${knowledge}`);
      });
      promptLines.push(`\n---\n`);
    }

    // Skills
    if (
      Array.isArray(processedJobData.skills) &&
      processedJobData.skills.length > 0
    ) {
      promptLines.push(`**Critical Skills:**\n`);
      const skillsToShow = processedJobData.skills.slice(0, 5);
      skillsToShow.forEach((skill) => {
        if (skill) promptLines.push(`- ${skill}`);
      });
      if (processedJobData.skills.length > 5) {
        promptLines.push(
          `*Additional skills include ${
            processedJobData.skills.length - 5
          } more skills.*`
        );
      }
      promptLines.push(`\n---\n`);
    }

    // Tasks
    if (
      Array.isArray(processedJobData.tasks) &&
      processedJobData.tasks.length > 0
    ) {
      promptLines.push(`**Common Tasks:**\n`);
      processedJobData.tasks.forEach((task) => {
        if (task) promptLines.push(`- ${task}`);
      });
      promptLines.push(`\n---\n`);
    }

    // Technology and Tools
    promptLines.push(`**Technology and Tools Used:**\n`);
    if (
      Array.isArray(processedJobData.technology) &&
      processedJobData.technology.length > 0
    ) {
      promptLines.push(
        `- **Software:** ${processedJobData.technology.join(", ")}.`
      );
    }
    if (
      Array.isArray(processedJobData.tools) &&
      processedJobData.tools.length > 0
    ) {
      promptLines.push(`- **Hardware:** ${processedJobData.tools.join(", ")}.`);
    }

    promptLines.push(`\n---\n`);

    // Work Values
    if (
      Array.isArray(processedJobData.values) &&
      processedJobData.values.length > 0
    ) {
      promptLines.push(`**Work Values:**\n`);
      processedJobData.values.forEach((value) => {
        if (value) promptLines.push(`- ${value}`);
      });
      promptLines.push(`\n---\n`);
    }

    // Educational Pathways in Kazakhstan
    if (
      Array.isArray(processedJobData.specs) &&
      processedJobData.specs.length > 0
    ) {
      promptLines.push(`**Educational Pathways in Kazakhstan:**\n`);
      promptLines.push(
        `To pursue this career, consider the following university specializations:\n`
      );
      processedJobData.specs.forEach((spec) => {
        if (spec.name) promptLines.push(`### **Specialization: ${spec.name}**`);
        if (spec.code) promptLines.push(`- **Code:** ${spec.code}`);
        if (spec.group_name)
          promptLines.push(`- **Group Name:** ${spec.group_name}`);
        if (spec.subjects)
          promptLines.push(`- **Required Subjects for ЕНТ:** ${spec.subjects}`);
        if (spec.count)
          promptLines.push(`- **Scholarships Last Year:** ${spec.count}`);

        if (Array.isArray(spec.universities) && spec.universities.length > 0) {
          promptLines.push(`\n**Universities Offering This Specialization:**`);
          spec.universities.forEach((univer, index) => {
            if (univer.name_ru)
              promptLines.push(
                `\n${index + 1}. **${univer.name_ru} ${
                  univer.abbreviation ? `(${univer.abbreviation})` : ""
                }**`
              );
            if (univer.code) promptLines.push(`   - **Code:** ${univer.code}`);
            if (univer.address)
              promptLines.push(`   - **Location:** ${univer.address}`);
            if (univer.region_name)
              promptLines.push(`   - **Region:** ${univer.region_name}`);
            if (univer.university_type)
              promptLines.push(
                `   - **University Type:** ${univer.university_type}`
              );
            if (univer.website)
              promptLines.push(`   - **Website:** ${univer.website}`);
            if (univer.social)
              promptLines.push(`   - **Social Media:** ${univer.social}`);
            if (univer.phone1 || univer.phone2) {
              promptLines.push(
                `   - **Contact:** ${univer.phone1}${
                  univer.phone2 ? ", " + univer.phone2 : ""
                }`
              );
            }
            promptLines.push(
              `   - **English Program Availability:** ${
                univer.is_english_available === "yes" ? "Yes" : "No"
              }`
            );
            if (univer.min_grant)
              promptLines.push(`   - **Scholarships:** ${univer.min_grant}`);
            if (univer.min_point_gen_2023)
              promptLines.push(
                `   - **Minimum ЕНТ Score for General Scholarship:** ${univer.min_point_gen_2023}`
              );
            if (univer.count_grant_gen_2023)
              promptLines.push(
                `   - **General Scholarships Available:** ${univer.count_grant_gen_2023}`
              );
            if (univer.min_point_aul_2023)
              promptLines.push(
                `   - **Minimum ЕНТ Score for Rural Quota Scholarship:** ${univer.min_point_aul_2023}`
              );
            if (univer.count_grant_aul_2023)
              promptLines.push(
                `   - **Rural Quota Scholarships Available:** ${univer.count_grant_aul_2023}`
              );
            if (univer.teacher_quota)
              promptLines.push(
                `   - **Teacher Quota:** ${univer.teacher_quota}`
              );
            if (univer.serpin_quota)
              promptLines.push(`   - **Serpin Quota:** ${univer.serpin_quota}`);
            if (univer.military_factory)
              promptLines.push(
                `   - **Military Education Included:** ${univer.military_factory}`
              );
            if (univer.dormitory)
              promptLines.push(
                `   - **Dormitory Available:** ${univer.dormitory}`
              );
          });
        }
        promptLines.push(`\n`);
      });
      promptLines.push(`---\n`);
    }

    // Additional Notes
    promptLines.push(`**Additional Notes:**\n`);
    promptLines.push(`- **Preparation Level:** ${prepNeededDescription}.`);
    promptLines.push(
      `- **Median Wage:** The median wage is provided in Kazakhstani Tenge.`
    );
    if (processedJobData.featured) {
      promptLines.push(
        `- **Featured Occupation:** This occupation is gaining popularity.`
      );
    }
    promptLines.push(
      `- **Educational Pathways:** Understanding the necessary subjects for the ЕНТ exam and the universities offering relevant programs can guide prospective students.`
    );
    promptLines.push(
      `- **University Quotas and Facilities:** Information about teacher quotas, Serpin quotas, military education, and dormitory availability is provided.`
    );
    promptLines.push(`\n---\n`);

    // Conclusion
    promptLines.push(`**Conclusion:**\n`);
    promptLines.push(
      `A career as a ${
        processedJobData.name
      } combines knowledge in ${processedJobData.group_name?.toLowerCase()} with essential skills and abilities. With a strong employment outlook and available educational pathways in Kazakhstan, this occupation offers promising opportunities for those interested in this field.`
    );

    // Conclusion
    promptLines.push(`**Conclusion:**\n`);
    promptLines.push(
      `A career as a ${processedJobData.name} combines knowledge in ${
        processedJobData.group_name?.toLowerCase() || "this field"
      } with essential skills and abilities. With a strong employment outlook and available educational pathways in Kazakhstan, this occupation offers promising opportunities for those interested in this field.`
    );

    // Join all lines into a single prompt text
    const promptText = promptLines.join("\n");

    // Return the prompt text
    return promptText;
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
}

// Helper functions
function processMedianWage(wage: number | null): number | null {
  if (wage == null) return null;
  const processed = (wage / 120) * 500;
  return Math.round(processed / 10000) * 10000;
}

function processNumber(value: number | string | null): number | null {
  if (value == null) return null;
  const numValue =
    typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  if (isNaN(numValue)) return null;
  const processed = numValue / 20;
  return Math.round(processed / 100) * 100;
}
