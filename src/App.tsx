import { useState } from 'react';
import { useForm } from "react-hook-form";
import Exchange from './exchange';
import Header from './components/Header';
import NoData from './components/NoData';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface Events {
  target: { value: string }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  { value: "eth", fullName: "Ethereum" },
  { value: "btc", fullName: "BitCoin" },
  { value: "ada", fullName: "Cardano" },
]

function App() {
  const [currencyName, setCurrencyname] = useState([]);
  const [datos, estableceDatos] = useState('');

  const handleChange = (event: Events) => {
    const {
      target: { value },
    } = event;
    setCurrencyname(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const setChilData = (data: any) => {
    estableceDatos(data)
  }

  const onSubmit = handleSubmit((data) => {
    setChilData(data);
    reset();
  });

  return (
    <div className="app--container">
      <Header />
      <form onSubmit={onSubmit}>
        <div className="form--input">
          <label htmlFor="amount">Ingresa un monto</label>
          <input type="number" min={1} autoComplete="off" {
            ...register("amount", {
              required: {
                value: true,
                message: "El monto es requerido"
              },
              min: {
                value: 1,
                message: "El monto mínimo es 1$"
              }
            })
          } />
          {
            errors?.amount && <span> {errors.amount.message} </span>
          }
        </div>
        <div className="form--input">
          <label htmlFor="criptoCurrency">Escoge una moneda</label>
          <div>
            <FormControl sx={{ m: 1, width: 600 }}>
              <InputLabel id="demo-multiple-name-label">Cripto</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={currencyName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                required
                inputProps={register('currencys', {
                  required: {
                    value: true,
                    message: "ingrese alguna moneda"
                  }
                })}
              >
                {options.map((name) => (
                  <MenuItem
                    key={name.fullName}
                    value={name.value}
                  >
                    {name.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <button type="submit" >Enviar</button>
      </form>
      {datos ? <Exchange body={datos} /> : <NoData />}
    </div>
  )
}

export default App