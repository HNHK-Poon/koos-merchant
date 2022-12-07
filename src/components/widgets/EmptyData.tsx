import React from 'react';
import PropTypes from 'prop-types';

const EmptyData = (props: any) => {
    return (
        <div className="grow w-full h-full flex justify-center items-center">
            <p className="m-auto text-center text-base text-dark-xs p-8">
                No Data Available
            </p>
        </div>
    );
};

EmptyData.propTypes = {};

export default EmptyData;
