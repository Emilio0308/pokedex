import React from "react";

const Header = () => {
  return (
    <section className="relative">
      <div className="h-20 bg-red-600 grid items-end">
        <div className="ml-2 max-w-[200px] sm:max-w-[300px]">
          <img src="/imagenes/pokedex.png" alt="" />
        </div>
      </div>
      <div className="h-14 bg-black"></div>
      <div
        className='h-20 aspect-square rounded-full border-[8px] bg-white border-black absolute left-[75%] top-[25%] m-auto after:content-[""] after:h-14 after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[7px] after:border-black after:bottom-0 after:top-0 after:left-0 after:right-0 after:m-auto sm:left-[50%]'
      ></div>
    </section>
  );
};

export default Header;
