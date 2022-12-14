import { useState } from "react";

// Create account page
export default () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthdate: "",
    bio: "",
    realName: "",
  });
  return (
    <div>
      <h1>Profile Header</h1>
    </div>
  );
};
