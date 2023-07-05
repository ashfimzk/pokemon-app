import { useNavigate } from "react-router-dom";


function Home(props) {
const Navigate = useNavigate()

const lightenColor = (color) => {
    if (!color) return ''; // Handle undefined or empty color
    let hexColor = color;
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
      // Convert color name to hex
      const tempElem = document.createElement("div");
      tempElem.style.color = color;
      document.body.appendChild(tempElem);
      const computedColor = getComputedStyle(tempElem).color;
      hexColor = computedColor.split("(")[1].split(")")[0];
      hexColor = hexColor
        .split(",")
        .map((c) => parseInt(c.trim()).toString(16).padStart(2, "0"))
        .join("");
      document.body.removeChild(tempElem);
    }
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const lightness = 0.4; // Adjust this value to make the color lighter (e.g., 0.4 for a lighter shade)
    const newR = Math.round((1 - lightness) * r + lightness * 255);
    const newG = Math.round((1 - lightness) * g + lightness * 255);
    const newB = Math.round((1 - lightness) * b + lightness * 255);
    return `rgb(${newR}, ${newG}, ${newB})`;
  };


  return (
    <div className="grid grid-cols-2 md:grid-cols-4 h-full gap-4 p-4">
      {props.state.data.map((val, idx) => (
        <button onClick={()=>Navigate(`/${val.name}`)}>
          <div
            className="rounded-lg shadow-lg p-4 flex justify-between"
            key={idx}
            // style={{ backgroundColor: `${val.color}` }}
            style={{ backgroundColor: lightenColor(val.color) }}
          >
            <div>
              <h1 className="text-sm md:text-2xl font-bold text-grey-500">
                {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
              </h1>
              <div className="flex flex-col flex-wrap gap-2 mt-2">
                {val.types ? (
                  val.types.map((type, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 text-gray-500 py-1 px-2 w-10 md:w-16 text-center rounded-2xl text-[8px] md:text-xs"
                    >
                      {type.type.name}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-700">Unknown</div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <img src={val.imageUrl} alt={val.name} className="w-32 h-32" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default Home;
