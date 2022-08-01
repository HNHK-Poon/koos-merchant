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
        if (props.path) {
            navigate(props.path);
            return;
        }
        navigate(-1);
    };
    return (
        <div className="bg-primary-m w-screen h-[64px] top-0 text-black text-xl flex justify-start items-center z-20">
            <div onClick={back} className="pl-2 flex items-center">
                <HiOutlineChevronLeft className="w-8 h-8 text-primary-xl" />
                <div className="px-2 text-primary-xl text-xl font-semibold">
                    {props.title}
                </div>
            </div>
        </div>
    );
};

PageHeader.propTypes = {};

export default PageHeader;
