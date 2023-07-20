import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  function onClickClear(event: React.MouseEvent<SVGSVGElement>) {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        id="Icons"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs></defs>
        <path d="M18.856,14.624a10.022,10.022,0,1,0-4.234,4.234l4.254,4.255a2.994,2.994,0,1,0,4.239-4.23ZM2,10a8,8,0,1,1,8,8A8.009,8.009,0,0,1,2,10ZM21.7,21.708a1,1,0,0,1-1.4,0l-3.967-3.968a10.092,10.092,0,0,0,1.4-1.406L21.705,20.3a.976.976,0,0,1-.009,1.407Z" />
        <path d="M10,4a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0,4,4,0,0,1,4-4,1,1,0,0,0,0-2Z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          enableBackground="new 0 0 64 64"
          version="1.1"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Layer_1" />
          <g id="icon">
            <g>
              <path
                d="M50.85,55.979c-1.364,0-2.646-0.531-3.609-1.495l-15.009-15.01c-0.144-0.141-0.373-0.141-0.516,0.001L16.708,54.484
				c-0.964,0.964-2.246,1.495-3.609,1.495c-1.27,0-2.486-0.469-3.425-1.319c-1.004-0.91-1.576-2.183-1.61-3.582 
				c-0.036-1.48,0.541-2.927,1.583-3.969l14.852-14.852c0.142-0.142,0.142-0.374-0.001-0.517L9.652,16.896    
				c-2.013-2.013-2.167-5.168-0.351-7.184c0.949-1.053,2.25-1.653,3.663-1.69c1.427-0.044,2.744,0.493,3.744,1.492l15.009,15.01   
				 c0.185,0.184,0.328,0.187,0.514,0.001l15.011-15.01c1.087-1.087,2.583-1.623,4.122-1.469c1.531,0.154,2.903,0.989,3.767,2.292   
				  c1.322,1.995,1.006,4.718-0.751,6.475L39.45,31.741c-0.143,0.143-0.143,0.375,0,0.518l15.009,15.008c1.99,1.99,1.99,5.228,0,7.218   
				   C53.496,55.448,52.214,55.979,50.85,55.979z M31.975,37.37c0.605,0,1.211,0.229,1.671,0.69l15.01,15.01   
					 c1.173,1.173,3.22,1.172,4.389,0c0.587-0.586,0.91-1.365,0.91-2.194c0-0.83-0.323-1.609-0.909-2.195l-15.01-15.009    
					 c-0.921-0.922-0.921-2.422-0.001-3.343l14.931-14.93c1.087-1.087,1.296-2.75,0.497-3.956c-0.537-0.812-1.354-1.312-2.299-1.407    
					 c-0.935-0.092-1.846,0.232-2.508,0.893l-15.01,15.009c-0.891,0.893-2.45,0.895-3.343,0L15.294,10.929  
					   c-0.608-0.608-1.434-0.91-2.277-0.908c-0.859,0.022-1.651,0.389-2.229,1.03c-1.085,1.204-0.96,3.192,0.279,4.431l14.847,14.846  
						  c0.921,0.922,0.921,2.422,0.001,3.343L11.061,48.523c-0.657,0.657-1.021,1.57-0.998,2.505c0.021,0.848,0.359,1.611,0.954,2.149   
						   c1.182,1.071,3.144,1.024,4.277-0.107l15.009-15.01C30.764,37.6,31.369,37.37,31.975,37.37z"
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
