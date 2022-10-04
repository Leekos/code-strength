import React, { useState } from "react";

import {
  CssBaseline,
  Grid,
  TextField,
  Button,
  Container,
  Checkbox,
  Card,
  CardContent,
  FormControlLabel,
} from "@material-ui/core";

function App() {
  const [length, setLength] = useState<number>();
  const [lengthError, setLengthError] = useState(false);

  const [smallLetters, setSmallLetters] = useState(false);
  const [bigLetters, setBigLetters] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [specials, setSpecials] = useState(false);

  const [speed, setSpeed] = useState<number>();
  const [power, setPower] = useState<number>();
  const [price, setPrice] = useState<number>();

  const [combinations, setCombinations] = useState<number>();
  const [time, setTime] = useState<number>();
  const [cost, setCost] = useState<string>();

  const selectOnlyLetters = () => {
    setSmallLetters(true);
    setBigLetters(true);
    setNumbers(false);
    setSpecials(false);
  };

  const selectAll = () => {
    setSmallLetters(true);
    setBigLetters(true);
    setNumbers(true);
    setSpecials(true);
  };

  const calculate = () => {
    if (!length) {
      setLengthError(true);
      return;
    }

    let availableCharacters = 0;
    if (smallLetters) availableCharacters += 26;
    if (bigLetters) availableCharacters += 26;
    if (numbers) availableCharacters += 10;
    if (specials) availableCharacters += 32;

    const result = Math.pow(availableCharacters, length);

    setCombinations(result);

    if (speed && power && price) {
      setTime(result / speed);

      const hours = result / speed / 60 / 60;
      const calculatedCost = (hours * power * price) / 1000;
      setCost(calculatedCost.toFixed(2) + "zł");
    }
  };

  const displayTime = (seconds: number | undefined) => {
    if (!seconds) return "";

    const y = Math.floor(seconds / (3600 * 24 * 365));
    const d = Math.floor((seconds % (3600 * 24 * 365)) / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    return `${y} lat, ${d} dni, ${h} godzin, ${m} minut, ${s} sekund`;
  };

  return (
    <>
      <CssBaseline />
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Card style={{ width: "230px" }}>
                  <CardContent>
                    <Grid container direction="column" spacing={1}>
                      <Grid item>
                        <TextField
                          label="Długość hasła"
                          error={lengthError}
                          value={length}
                          onChange={(e) => {
                            setLengthError(false);
                            setLength(parseInt(e.target.value) || undefined);
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={smallLetters}
                              onChange={(e) =>
                                setSmallLetters(e.target.checked)
                              }
                              color="primary"
                            />
                          }
                          label="Małe litery"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={bigLetters}
                              onChange={(e) => setBigLetters(e.target.checked)}
                              color="primary"
                            />
                          }
                          label="Duże litery"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={numbers}
                              onChange={(e) => setNumbers(e.target.checked)}
                              color="primary"
                            />
                          }
                          label="Cyfry"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={specials}
                              onChange={(e) => setSpecials(e.target.checked)}
                              color="primary"
                            />
                          }
                          label="Znaki specjalne"
                        />
                      </Grid>

                      <Grid item>
                        <Button variant="contained" onClick={selectOnlyLetters}>
                          Zaznacz tylko litery
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" onClick={selectAll}>
                          Zaznacz wszystko
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{ width: "230px" }}>
                  <CardContent>
                    <TextField
                      label="Szybkość badania (/s)"
                      value={speed}
                      onChange={(e) => {
                        setSpeed(parseInt(e.target.value) || undefined);
                      }}
                    />
                    <TextField
                      label="Pobór prądu (W/h)"
                      value={power}
                      onChange={(e) => {
                        setPower(parseInt(e.target.value) || undefined);
                      }}
                    />
                    <TextField
                      label="Cena prądu (kWh w gr)"
                      value={price}
                      onChange={(e) => {
                        setPrice(parseInt(e.target.value) || undefined);
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={calculate}>
                  Oblicz
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>Mozliwe kombinacje: {combinations}</Grid>
              <Grid item>Ile to zajmie: {displayTime(time)}</Grid>
              <Grid item>Koszt obliczenia: {cost}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
