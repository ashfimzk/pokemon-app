import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Progress, Tabs } from "antd";

function Detail() {
  const { TabPane } = Tabs;

  const name = useParams();

  const [img, setImg] = useState("");
  const [pokemon, setPokemon] = useState();
  const [tabBarGutter, setTabBarGutter] = useState(0);
  const [bg,setBg] =useState()
  const getDetail = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.name}`
      );
      console.log(response.data);
      setImg(response.data.sprites.other.dream_world.front_default);
      setPokemon(response.data);
      getBackgroundColor(response.data.species.url)
    } catch (error) {}
  };

  const getBackgroundColor = async(url)=>{
    try {
      // console.log(url,'masuk')
      let response = await axios.get(url)
      setBg(response.data.color.name)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    const handleResize = () => {
      const newTabBarGutter = window.innerWidth > 400 ? 100 : 20;
      setTabBarGutter(newTabBarGutter);
    };

    handleResize(); // Initial call

    window.addEventListener("resize", handleResize); // Event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);

  useEffect(() => {
    getDetail();
  }, []);

  const getColor = (baseStat) => {
    if (baseStat && baseStat < 50) {
      return "red";
    } else {
      return "green";
    }
  };

  const formatProgress = (percent, successPercent) => {
    if (percent === 100) {
      return `${percent}%`;
    }
    return `${percent}%`;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[500px]"      style={{ backgroundColor:`${bg}` }}  >
        <h1 className="text-3xl font-semibold">
          {pokemon
            ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            : null}
        </h1>
        <img src={img} className="h-[300px] md:h-[400px]" />
      </div>

      <div
        className=" mt-[-150px] md:mt-[-100px] bg-white h-[700px]"
        style={{ borderRadius: "40px 40px 0 0" }}
      >
        <div className="pt-36">
          <div className="">
            <Tabs
              centered={true}
              defaultActiveKey="1"
              // className="flex !justify-between"
              tabBarGutter={tabBarGutter}
            >
              <TabPane
                tab={<span className="text-[15px] md:text-[20px]">About</span>}
                key="1"
              >
                <div className="flex justify-center ">
                  <div className="pr-10 h-[400px] flex-row ">
                    <h1 className="text-2xl mb-16 text-gray-500">Species</h1>
                    <h1 className="text-2xl mb-16 text-gray-500">Height</h1>
                    <h1 className="text-2xl mb-16 text-gray-500">Weight</h1>
                    <h1 className="text-2xl mb-16 text-gray-500">Abilities</h1>
                  </div>
                  <div className="pr-10 h-[400px] flex-row ">
                    <h1 className="text-2xl mb-16">Seed</h1>
                    <h1 className="text-2xl mb-16">
                      {pokemon ? (pokemon.height / 10).toFixed(2) : null} cm
                    </h1>
                    <h1 className="text-2xl mb-16">
                      {pokemon
                        ? parseFloat((pokemon.weight / 10).toFixed(1))
                        : null}{" "}
                      Kg (
                      {pokemon
                        ? ((pokemon.weight / 10) * 2.20462).toFixed(1)
                        : null}{" "}
                      Lbs)
                    </h1>
                    <h1 className="text-2xl mb-16">
                      {pokemon
                        ? pokemon.abilities
                            .map((val) => val.ability.name)
                            .join(", ")
                            .replace(/(?:^|\s)\S/g, (char) =>
                              char.toUpperCase()
                            )
                        : null}
                    </h1>
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span className="text-[15px] md:text-[20px]">Base Stats</span>
                }
                key="2"
              >
                <div className="flex justify-center pl-10 ">
                  <div className="pr-10 h-[400px] flex-row ">
                    <h1 className="text-2xl mb-14">HP</h1>
                    <h1 className="text-2xl mb-14">Attack</h1>
                    <h1 className="text-2xl mb-14">Defense</h1>
                    <h1 className="text-2xl mb-14">Sp. Atk</h1>
                    <h1 className="text-2xl mb-14">Sp. Def</h1>
                  </div>
                  <div className="pr-10 h-[400px] flex-row w-96">
                    <Progress
                      percent={pokemon ? pokemon.stats[0].base_stat : null}
                      strokeColor={getColor(pokemon?.stats[0].base_stat)}
                      format={formatProgress}
                      className="mb-16"
                    />

                    <Progress
                      percent={pokemon ? pokemon.stats[1].base_stat : null}
                      strokeColor={getColor(pokemon?.stats[1].base_stat)}
                      format={formatProgress}
                      className="mb-16"

                    />

                    <Progress
                      percent={pokemon ? pokemon.stats[2].base_stat : null}
                      strokeColor={getColor(pokemon?.stats[2].base_stat)}
                      format={formatProgress}
                      className="mb-16"

                    />

                    <Progress
                      percent={pokemon ? pokemon.stats[3].base_stat : null}
                      strokeColor={getColor(pokemon?.stats[3].base_stat)}
                      format={formatProgress}
                      className="mb-16"

                    />

                    <Progress
                      percent={pokemon ? pokemon.stats[4].base_stat : null}
                      strokeColor={getColor(pokemon?.stats[4].base_stat)}
                      format={formatProgress}
                      className="mb-16"

                    />
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span className="text-[15px] md:text-[20px]">Evolution</span>
                }
                key="3"
              >
                Evolution Content
              </TabPane>
              <TabPane
                tab={<span className="text-[15px] md:text-[20px]">Moves</span>}
                key="4"
              >
              Moves content
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
