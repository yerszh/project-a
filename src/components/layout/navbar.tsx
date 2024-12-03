import React from "react";

type NavbarProps = {
  title?: React.ReactNode;
  leftLinkButton?: React.ReactNode;
  rightLinkButton?: React.ReactNode;
};

const Navbar: React.FC<NavbarProps> = ({
  title,
  leftLinkButton,
  rightLinkButton,
}) => {
  return (
    <div className="w-full flex justify-between ">
      {leftLinkButton}

      {title}

      {rightLinkButton}
    </div>
  );
};

export default Navbar;
