/*This class executes the sorting animation based off a series of steps provided by the
Sorting Algorithm class. This class renders and places the visual elements. */
import React, { PureComponent } from 'react';
import {getBubbleSortAnimations, getInsertionSortAnimations, getMergeSortAnimations} from '../SortingAlgorithm/SortingAlgorithm.js';
import './SortingVisualizer.css';

const BUBBLE_ANIMATION_SPEED = .5;
const MERGE_ANIMATION_SPEED = 3


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { array: [], isAnimating: false};
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
        //this.setState({isAnimating: true});
        
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {

            // requestAnimationFrame(() => {
            //     // Firefox will sometimes merge changes that happened here
            //     requestAnimationFrame(() => {
            //       this.setState({ isAnimating: true });
            //     });
            //   });
            
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
        
        //setTimeout(() => this.setState({isAnimating: false}), animations.length * MERGE_ANIMATION_SPEED);
        
    }

    bubbleSort() {
        this.setState({isAnimating: true});
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
            else {
                if(i.length === 2){
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = 'yellow';
                        barTwoStyle.backgroundColor = 'yellow';
                    }, i * BUBBLE_ANIMATION_SPEED);
                    
                }
                else {
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
        
        setTimeout(() => this.setState({isAnimating: false}), animations.length * BUBBLE_ANIMATION_SPEED);
    }

    insertionSort() {
        //this.setState({isAnimating: true});
        const animations = getInsertionSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                if(animations[i][1] === 'on') {
                    const barIndex = animations[i][0];
                    const barStyle = arrayBars[barIndex].style;
                    setTimeout(() => {
                        barStyle.backgroundColor = 'purple';
                    }, i * BUBBLE_ANIMATION_SPEED);
                }
                if(animations[i][1] === 'off') {
                    const barIndex = animations[i][0];
                    const barStyle = arrayBars[barIndex].style;
                    setTimeout(() => {
                        barStyle.backgroundColor = 'yellow';
                    }, i * BUBBLE_ANIMATION_SPEED);
                }
                else {
                    const barIndex = animations[i][0];
                    const barValue = animations[i][2];
                    const barStyle = arrayBars[barIndex].style;
                    setTimeout(() => {
                        barStyle.height = `${barValue}px`;
                        }, i * BUBBLE_ANIMATION_SPEED);
                }
                    
            //for each loop    

                
            
        }
        //setTimeout(() => this.setState({isAnimating: false}), animations.length * BUBBLE_ANIMATION_SPEED);
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
                <div className='display'>
                <button className='button1' disabled={this.state.isAnimating} onClick={() => this.resetArray()}>Generate New Array</button>
                <button className='button2' disabled={this.state.isAnimating} onClick={() => this.mergeSort()}>Merge Sort</button>
                <button className='button3' disabled={this.state.isAnimating} onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button className='button4' disabled={this.state.isAnimating} onClick={() => this.insertionSort()}>Insertion Sort</button>
                </div>
                

                
                
            </div>

        );
        
    }
 
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}