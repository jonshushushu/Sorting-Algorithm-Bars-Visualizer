import React, { PureComponent } from 'react';
import {getBubbleSortAnimations, getMergeSortAnimations} from '../SortingAlgorithm/SortingAlgorithm.js';
import './SortingVisualizer.css';

const BUBBLE_ANIMATION_SPEED = .3;
const MERGE_ANIMATION_SPEED = 3


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { array: [], };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < 300; i++) {
            array.push(randomInteger(5,575));
        }
        this.setState({array});
    }
    
    mergeSort() {

        // window.addEventListener("click", (e) => {
        //     e.stopPropagation();
        //     e.stopImmediatePropagation();
        //     e.preventDefault();
        //   }, true);

        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'green' : 'yellow';
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * MERGE_ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * MERGE_ANIMATION_SPEED);
            }
        }
        // window.removeEventListener("click", (e) => {
        //     e.stopPropagation();
        //     e.stopImmediatePropagation();
        //     e.preventDefault();
        //   }, true);

    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                if(i % 2 === 0){
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = 'purple';
                        barTwoStyle.backgroundColor = 'green';
                    }, i * BUBBLE_ANIMATION_SPEED);
                }
                else{
                    if(i.length === 2){
                        const [barOneIdx, barTwoIdx] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        setTimeout(() => {
                            barOneStyle.backgroundColor = 'yellow';
                            barTwoStyle.backgroundColor = 'yellow';
                        }, i * BUBBLE_ANIMATION_SPEED);
                        
                    }
                    else{
                        const [barOneIdx, barTwoIdx, newHeightOne, newHeightTwo] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        setTimeout(() => {
                            barOneStyle.backgroundColor = 'yellow';
                            barTwoStyle.backgroundColor = 'yellow';
                            barOneStyle.height = `${newHeightOne}px`;
                            barTwoStyle.height = `${newHeightTwo}px`;
                            }, i * BUBBLE_ANIMATION_SPEED);
                    }
                    
                }

                
            
        }
    }



    render() { 
        const {array} = this.state;
        return (
            

            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                    className="array-bar" 
                    key={idx}
                    style={{
                        backgroundColor: 'yellow',
                        height: `${value}px`
                    }}></div>
                ))}


                <button onClick={() =>{ return this.resetArray()}}>Generate New Array</button>
                <button onClick={() =>{ return this.mergeSort()}}>Merge Sort</button>
                <button onClick={() =>{ return this.bubbleSort()}}>Bubble Sort</button>
                
            </div>

        );
        
    }
 
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}