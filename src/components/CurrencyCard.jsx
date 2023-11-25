import React, { useRef, useState } from "react";
import CurrencyImg from "../assets/currency.png";
import { formattedCountryList } from "../utility/CountryData";

const CurrencyCard = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [outputRate, setOutputRate] = useState("Enter a value to get the rate");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const amountRef = useRef(null);
  const fromCurrencyImageRef = useRef(null);
  const toCurrencyImageRef = useRef(null);

  function handleFromCurrencyChange(e) {
    setFromCurrency(e.target.value);
    formattedCountryList.map((country) => {
      if (country.code === e.target.value) {
        fromCurrencyImageRef.current.src = `https://flagcdn.com/48x36/${country.country.toLowerCase()}.png`;
      }
    });
  }

  function handleToCurrencyChange(e) {
    setToCurrency(e.target.value);
    formattedCountryList.map((country) => {
      if (country.code === e.target.value) {
        toCurrencyImageRef.current.src = `https://flagcdn.com/48x36/${country.country.toLowerCase()}.png`;
      }
    });
  }

  function handleSwapCurrency() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    formattedCountryList.map((country) => {
      if (country.code === toCurrency) {
        fromCurrencyImageRef.current.src = `https://flagcdn.com/48x36/${country.country.toLowerCase()}.png`;
      } else if (country.code === fromCurrency) {
        toCurrencyImageRef.current.src = `https://flagcdn.com/48x36/${country.country.toLowerCase()}.png`;
      }
    });
  }

  function handleExchangeRate() {
    if (amountRef.current.value === "") {
      setOutputRate("Please enter a value");
      return;
    } else if (!isNaN(parseInt(amountRef.current.value))) {
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setOutputRate(
            `${amountRef.current.value} ${fromCurrency} = ${(
              data.conversion_rates[toCurrency] * amountRef.current.value
            ).toFixed(2)} ${toCurrency}`
          );
        })
        .catch((err) => {
          console.log(err);
          setOutputRate("Something went wrong");
        });
    } else {
      setOutputRate("Please enter a valid value");
    }
  }

  return (
    <div className="relative lg:h-[340px] h-fit w-full bg-white/10  backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl lg:py-4 lg:px-6 p-2 mt-12 lg:mt-0">
      <div className="w-full lg:h-full flex items-center flex-col gap-4">
        <div className="w-full flex flex-row items-center gap-2">
          <img
            src={CurrencyImg}
            alt="currencylogo"
            className="lg:w-[60px] hidden lg:inline rounded-full object-contain border-4 border-indigo-500 p-1"
          />
          <p className="lg:text-[2rem] text-[1.7rem] font-bold capitalize">
            Currency Converter
          </p>
        </div>

        <div className="lg:w-[70%] w-full flex items-center justify-center">
          <input
            type="text"
            ref={amountRef}
            placeholder="Enter Amount"
            className="w-full border-2 rounded-lg border-gray-700 p-2 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit placeholder:text-slate-700 placeholder:italic placeholder-opacity-50"
          />
        </div>

        <div className="lg:w-[70%] w-full flex items-center justify-between">
          <div className="w-[40%] flex flex-col">
            <p className="text-slate-700 font-bold">From</p>
            <div className="w-full flex gap-2 items-center">
              <img
                src="https://flagcdn.com/48x36/us.png"
                alt="flag"
                ref={fromCurrencyImageRef}
                className="w-[40px]"
              />
              <select
                name="from"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
                className="border-2 border-gray-700 rounded-lg p-2 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit placeholder:text-slate-700 placeholder:italic placeholder-opacity-50"
              >
                {formattedCountryList.map((country) => (
                  <option value={country.code} key={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <span
            className="text-[1.5rem] cursor-pointer hover:scale-110 transition-all ease-in text-slate-600 hover:text-slate-900"
            onClick={handleSwapCurrency}
          >
            <i className="fa-solid fa-right-left"></i>
          </span>

          <div className="w-[40%] flex flex-col">
            <p className="text-slate-700 font-bold">To</p>
            <div className="w-full flex gap-2 items-center">
              <img
                src="https://flagcdn.com/48x36/in.png"
                alt="flag"
                ref={toCurrencyImageRef}
                className="w-[40px]"
              />
              <select
                name="from"
                value={toCurrency}
                onChange={handleToCurrencyChange}
                className="border-2 border-gray-700 rounded-lg p-2 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit placeholder:text-slate-700 placeholder:italic placeholder-opacity-50"
              >
                {formattedCountryList.map((country) => (
                  <option value={country.code} key={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="lg:w-[70%] w-full">
          <p className="text-[1.05rem] font-bold text-slate-700">
            {outputRate}
          </p>
        </div>

        <button
          type="button"
          className="lg:w-[70%] w-full mb-4 p-2 border-2 bg-indigo-700 rounded-full border-indigo-700 shadow-2xl text-white font-bold hover:bg-transparent hover:text-indigo-700 transition-all ease-in"
          onClick={handleExchangeRate}
        >
          Exchange Rate
        </button>
      </div>
    </div>
  );
};

export default CurrencyCard;
