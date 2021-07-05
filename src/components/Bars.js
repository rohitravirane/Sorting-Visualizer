import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Slider, Snackbar } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Items from './Items';
import { generateRandomArray, generateRandomColor, disabledAll, enableAll } from '../utils/Utils';
import { getAlgoFunction } from '../utils/SortingAlgorithms';
import './bars.css'
import 'typeface-roboto';
import { uid } from "react-uid";

export default function MainScreen() {
    const [layout, setLayout] = useState("horizontal");
    const [speed, setSpeed] = useState(1000);
    const [numItems, setNumItems] = useState(20);
    const [isSorted, setIsSorted] = useState(false);
    const [algoFunction, setAlgoFunction] = useState("BubbleSort");
    const [inputType, setInputType] = useState("DefaultInput");
    // State to start the sort process
    const [process, setProcess] = useState(false);
    const [items, setItems] = useState(generateRandomArray(numItems));
    const [customNumbers, setCustomNumbers] = useState([]);

    const maxItems = layout === 'horizontal' ? 56 : 56;

    function changeSpeed(e) {
        const newSpeed = e.target.value;
        if (newSpeed < 0 || newSpeed > 1000) {
            alert('Speed should be between 0 and 1000 ms');
        } else {
            setSpeed(newSpeed);
        }
    }

    function customInput(e) {
        let input = e.target.value.split(' ').filter(number => parseInt(number));
        setCustomNumbers(input);
    }

    function submit() {
        setItems([]);
        let customItems = [];
        for (let i = 0; i < customNumbers.length; i++) {
            const value = customNumbers[i];
            customItems.push({ id: uid(Math.random()), itemValue: Number(value), color: generateRandomColor(), IsBeingSwapped: false })
        }
        setItems(customItems)
    }
    function toggleLayout() {
        if (layout === "vertical")
            setLayout("horizontal");
        else
            setLayout("vertical");
    }

    function reset() {
        setProcess(false);
        setAlgoFunction("BubbleSort");
        setIsSorted(false);
        setNumItems(20);
    }

    function reset(num) {
        setProcess(false);
        // Changing the AlgoFunction when number of item is changed is unneccessary
        // setAlgoFunction("BubbleSort");
        setIsSorted(false);
        setNewItems(num);
    }

    /**
     * Reset to same number of random items
     */
    function resetNumbers() {
        setProcess(false)
        setIsSorted(false)
        setAlgoFunction(algoFunction)
        let randomItems = generateRandomArray(numItems)
        setItems(randomItems)
    }

    function setNewItems(num) {
        if (num === numItems) {
            return
        }

        setNumItems(num);
        let randomItems = generateRandomArray(num);
        setItems(randomItems);
    }

    function checkSwappedElements(itemsPrev, itemsCurrent) {
        let newItems = []
        for (let i = 0; i < items.length; i++) {
            newItems[i] = itemsCurrent[i];
            if (itemsCurrent[i].itemValue !== itemsPrev[i].itemValue) {
                newItems[i].IsBeingSwapped = true;
            }
        }
        return newItems;
    }

    function runAlgorithm() {
        const result = getAlgoFunction(algoFunction)(items);
        for (let i = 0; i < result.length; i++) {

            if (i !== result.length - 1) {
                let resultItemsWithSwapState = i === 0 ? checkSwappedElements(items, result[i]) : checkSwappedElements(result[i - 1], result[i]);
                setTimeout(() => {
                    setItems(resultItemsWithSwapState)
                }, i * speed);
            }
            else {
                setTimeout(() => {
                    setItems(result[i])
                }, i * speed);
            }

            setTimeout(() => {
                setIsSorted(true)
            }, result.length * speed);
        }
    }

    function handleClose(reason) {
        if (reason === 'clickaway') {
            return;
        }
        // setOpen(false);
    };
    
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" style={{ height: '100vh' }} className="container">
                <Grid container spacing={3}>
                    <Grid item xs={12} id="head">
                        <Typography color="textSecondary" component="h5" variant="h5">Sorting
                            Visualizer</Typography>
                    </Grid>

                    {inputType === "DefaultInput" && <Grid item xs={12}>
                        <Slider
                            value={typeof numItems === 'number' ? numItems : 0}
                            onChange={(e, newValue) => reset(newValue)}
                            aria-labelledby="input-slider"
                            valueLabelDisplay="auto"
                            max={maxItems}
                            id="slideRange"
                        />
                    </Grid>}

                    {/* {inputType === "DefaultInput" && <Grid item xs={12}>
                        <Typography component="h7" variant="h7">Number of items: {numItems}</Typography>
                    </Grid>} */}

                    <Grid item xs={12} className="inputNums">
                        <FormControl>
                            <RadioGroup row aria-label="input-type" name="input-type" value={inputType}
                                onChange={(e) => setInputType(e.target.value)}>
                                <FormControlLabel id="ciG" value="CustomInput" control={<Radio id="ci" />} label="Custom Input" />
                                <FormControlLabel id="diG" value="DefaultInput" control={<Radio id="di" />} label="Default Input" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {inputType === "CustomInput" && <Grid item xs={12} className="done">
                        <TextField id="custom_input"
                            onChange={customInput}
                            type="text"
                            placeholder="Insert space separated numbers. Eg: 4 6 92 12 67"
                            style={{ width: "100%" }}
                        />
                        <button id="done"
                            onClick={() => submit()}>
                            Submit
                        </button>
                    </Grid>
                    }
                    <Grid item xs={12} className="sortAlgo">
                        <FormControl>
                            <FormLabel component="legend">Sorting Algorithm</FormLabel>
                            <RadioGroup row aria-label="algorithm" name="algorithm" value={algoFunction}
                                onChange={(e) => setAlgoFunction(e.target.value)}>
                                <FormControlLabel id="bubbleG" value="BubbleSort" control={<Radio id="bubble" />} label="BubbleSort" />
                                <FormControlLabel id="insertionG" value="InsertionSort" control={<Radio id="insertion" />} label="InsertionSort" />
                                <FormControlLabel id="selectionG" value="SelectionSort" control={<Radio id="selection" />} label="SelectionSort" />
                                <FormControlLabel id="mergeG" value="MergeSort" control={<Radio id="merge" />} label="MergeSort" />
                                <FormControlLabel id="quickG" value="QuickSort" control={<Radio id="quick" />} label="QuickSort" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex'}}>
                        <button id="launch"
                            onClick={() => {runAlgorithm(); disabledAll()}}>
                            Start
                        </button>
                        <button style={{ float: 'right' }}
                            onClick={() => toggleLayout()} id="toggle">
                            Toggle Layout: {layout.toUpperCase()}
                        </button>
                        <button style={{ float: 'right' }}
                            onClick={() => resetNumbers()} id="random">
                            Random
                        </button>
                        <TextField
                            id="standard-number"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={speed}
                            onChange={changeSpeed}
                        />
                    </Grid>

                    <Grid alignContent='center' alignItems='center' item xs={12}>
                        <Items
                            items={items}
                            layout={layout}
                        />
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    id="snackbar"
                    open={isSorted}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Sorting completed!"
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={() => {resetNumbers(); enableAll()}}>
                                RESET
                            </Button>
                        </React.Fragment>
                    }
                />
            </Container>
        </React.Fragment>
    );
}
