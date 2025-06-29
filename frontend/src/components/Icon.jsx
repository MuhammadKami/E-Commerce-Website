import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Icon() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user ? (
        <div className="flex flex-col justify-center text-center items-center mt-2">
          <FaUserCircle className="text-lg cursor-pointer" />
          <p className="text-xs">{user.name || user.email}</p>
        </div>
      ) : null}
    </>
  );
}
