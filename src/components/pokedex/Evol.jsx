import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Evol = ({ url, name }) => {
  const [chain, setChain] = useState();

  useEffect(() => {
    if (url) {
      axios
        .get(url)
        .then((res) => {
          const chain = res.data.chain;
          const newChain = []
            newChain.push(chain.species.name) 
            newChain.push(chain.evolves_to[0]?.species.name)
            newChain.push(chain.evolves_to[0]?.evolves_to[0]?.species.name)
            console.log(newChain)
          setChain(newChain);
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <h4>Chain evolution</h4>
      <article className="flex flex-wrap w-full justify-around gap-5 items-center">
        {
        chain?.map((eslabon) => {
            if (eslabon) return <a href={`/pokedex/${eslabon}`}
             className={`w-[150px] p-4 capitalize rounded-md ${name.toLowerCase() == eslabon ? "bg-red-600": "bg-red-400"}`} key={eslabon}> {eslabon}</a> 
        })
        }
      </article>
    </section>
  );
};

export default Evol;
