import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface IProp {
    title: string;
    path?: string;
}

const PageHeader = (props: IProp) => {
    const navigate = useNavigate();

    const back = () => {
        navigate(-1);
    };
    return (
        <div className="absolute bg-dark-s w-screen h-[56px] top-0 text-black text-xl flex justify-start items-center">
            <div
                onClick={back}
                className="flex items-center"
            >
                <HiOutlineChevronLeft className="ml-4 w-10 h-10 text-white" />
            </div>
            <div className='px-2 text-white text-xl font-semibold'>{props.title}</div>
        </div>
    );
};

PageHeader.propTypes = {};

export default PageHeader;
