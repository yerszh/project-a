const SchoolAdminPage = async ({ params }: { params: any }) => {
  const { lookerId } = await params;

  return (
    <iframe
      src={`https://lookerstudio.google.com/embed/reporting/${lookerId}/page/MQlbE`}
      sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      title="School Admin"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    ></iframe>
  );
};

export default SchoolAdminPage;
