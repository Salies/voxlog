import Image from "next/image";
import Avatar from "react-avatar";

const UserImage = ({ profilePictureUrl, name, sizeInPixels = 128 }) => {
  return (
    <>
      {profilePictureUrl ? (
        <Image
          src={profilePictureUrl}
          alt="avatar"
          width={sizeInPixels}
          height={sizeInPixels}
          className="rounded-full"
        />
      ) : (
        <Avatar
          name={name}
          size={sizeInPixels.toString()}
          round={true}
          className={`rounded-full w-16 h-16`}
        />
      )}
    </>
  );
};

export default UserImage;
