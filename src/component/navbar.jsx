
import { useNavigate } from "react-router-dom";
function Navbar() {
    const Navigate = useNavigate()
  return (
    <div className="flex justify-between">
      <div>
        <button onClick={()=>Navigate("/")}>
          <img
            className="h-20"
            src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
            alt=""
          />
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
