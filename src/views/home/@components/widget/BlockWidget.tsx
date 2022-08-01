import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    blocksSelectors,
    getBlocks,
    selectBlockProperties,
    selectBlocks,
} from '@/infrastructure/state/block';

const BlockWidget = () => {
    const navigate = useNavigate();
    const toReward = () => {
        navigate('reward');
    };
    // const blocks = blocksSelectors.selectAll;
    const blocks = useSelector(selectBlocks);
    const currentBlock = useSelector((state:any) => state.blocks.currentBlock);
    const blockProperties = useSelector(selectBlockProperties).filter((block) => block.IsDefault === true);
    const [completedBlock, setCompletedBlock] = useState(0);
    const [blockSize, setBlockSize] = useState(0);
    const [percentage, setPercentage] = useState(30);
    const [currentAmount, setCurrentAmount] = useState(0);
    console.log('currentBlock', currentBlock);
    console.log('blockProperties', blockProperties);

    useEffect(() => {
        setCompletedBlock(
            blocks.filter((block) => block.Status === 'Completed').length
        );
        setCurrentAmount(currentBlock.CurrentAmount);
        if(blockProperties.length > 0) {
            setBlockSize(blockProperties[0].BlockSpendSize);
            setPercentage(
                (currentBlock.CurrentAmount / blockProperties[0].BlockSpendSize) * 100
            );
        }
    }, [blocks, currentBlock, blockProperties]);

    return (
        <div onClick={toReward}>
            <p className='pt-4 px-2 text-sm font-light'>My Block Progress</p>
            <div className="relative px-2 py-2 shadow-md rounded-lg flex justify-center items-center bg-light-xl">
                <div className="w-full h-6 bg-primary-xs rounded-full mx-2 relative">
                    <div
                        className="h-6 bg-primary-m rounded-full"
                        style={{ width: `${percentage}%` }}
                    >
                        
                    </div>
                    <div className='absolute top-0 w-full text-center text-primary-xl font-bold'>{percentage.toFixed(1)}%</div>
                </div>
                <div>
                    <div className="h-10 w-10 bg-primary-xs text-center text-xl font-bold text-primary-l rounded-full border-4 border-primary-l">
                        {completedBlock}
                    </div>
                    {/* <p className="text-xs text-dark-xs text-center">Block</p> */}
                </div>
            </div>
            <div className="">
                <p className="text-xs text-primary-xl text-center font-semibold mt-1">
                    RM{currentAmount}/RM{blockSize}
                </p>
            </div>
        </div>

        // <CircularProgressbar
        //     value={percentage}
        //     text={`${percentage}%`}
        //     background
        //     backgroundPadding={6}
        //     styles={buildStyles({
        //       backgroundColor: "#3e98c7",
        //       textColor: "#fff",
        //       pathColor: "#fff",
        //       trailColor: "transparent"
        //     })}
        //   />
    );
};

BlockWidget.propTypes = {};

export default BlockWidget;
