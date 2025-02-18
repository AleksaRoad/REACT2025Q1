import type { MouseEvent } from 'react';

type FavoriteButton = {
  isFavorite: boolean;
  onClick: () => void;
};

export function FavoriteButton({ isFavorite, onClick }: FavoriteButton) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };

  return (
    <button
      className="dark:focus:outline-blue-xs focus:outline-focus flex cursor-pointer items-center justify-center p-1"
      onClick={handleClick}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0,0,256,256"
        className={
          isFavorite ? 'fill-red-600' : 'fill-yellow-950 dark:fill-black'
        }
      >
        <g
          fillRule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
        >
          <g transform="translate(0.00006,0) scale(0.256,0.256)">
            <g>
              <path d="M500.15,209.12c1.63,0 3.09,0.81 3.58,2.28l85.62,198.1l216.65,19.37c1.46,0.16 2.77,1.14 3.26,2.44c0.33,1.14 0,2.28 -0.98,3.09l-163.91,142.1l48.34,210.47c0.33,1.3 -0.16,2.44 -1.3,3.26c-0.81,0.65 -1.79,0.81 -2.44,0.81c-0.81,0 -1.46,-0.16 -2.12,-0.49l-186.7,-110.36l-186.54,110.2c-0.65,0.49 -1.46,0.65 -2.28,0.65c-0.81,0 -1.63,-0.16 -2.44,-0.81c-1.14,-0.81 -1.63,-1.95 -1.3,-3.26l48.51,-210.47l-164.08,-142.1c-0.98,-0.81 -1.3,-2.12 -0.98,-3.09c0.49,-1.3 1.79,-2.28 3.26,-2.44l216.49,-19.37l85.62,-198.1c0.65,-1.47 2.11,-2.28 3.74,-2.28M500.15,170.05c-17.09,0 -32.72,10.09 -39.39,25.72l-76.5,176.77l-193.55,17.26c-17.09,1.63 -31.58,13.02 -36.95,29.14c-5.37,16.11 -0.33,33.86 12.53,44.93l146.18,126.63l-43.14,187.52c-3.74,16.6 2.77,33.69 16.6,43.79c7.32,5.21 16.11,8.14 25.07,8.14c7.65,0 15.3,-2.12 21.97,-6.02l167.17,-98.48l166.86,98.47c6.84,4.07 14.49,6.02 21.97,6.02c8.79,0 17.58,-2.77 25.07,-8.14c14,-9.93 20.51,-27.18 16.6,-43.79l-43.13,-187.51l146.17,-126.64c13.02,-11.23 17.91,-28.81 12.53,-44.93c-5.38,-16.12 -19.86,-27.67 -36.95,-29.14l-193.38,-17.42l-76.34,-176.77c-6.83,-15.45 -22.3,-25.55 -39.39,-25.55z"></path>
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
}
