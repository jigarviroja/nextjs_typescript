import React from "react";
import Router from "next/router";
import { authenticate } from "../utils/Cookies";

const UserSection = () => {
  let useroption: { id: string; sectionLabel: string }[] = [
    { id: "1", sectionLabel: "Users" },
  ];

  const handleSection = () => {
    authenticate().then((res) => Router.push("/user"));
  };

  return (
    <div>
      {useroption.length > 0 &&
        useroption.map((section) => (
          <div className="row my-5 px-5" key={section.id}>
            <h3
              onClick={() => handleSection()}
              className="cursorPtr loginBoxShadow d-flex align-items-center justify-content-center col-2"
              style={{ height: "150px" }}
            >
              {section.sectionLabel}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default UserSection;
