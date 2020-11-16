/**
 * @fileOverview The text component in the Donut Chart inner circle.
 * Shows the selected item's label and value
 * @name DonutInnerText.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * @extends {Component}
 */
export default class DonutInnerText extends Component {
    /* React render function */
    render() {
        const { item, className, width, formatValues, total, centerColor } = this.props;
        // const { label } = item;
        const { value } = item;
        const half = width / 2 + 10; //The extra 10 is to center it due to the addition of "%" that makes it not centered
        // const labelClassName = `${className}-label`;
        const valueClassName = `${className}-value`;

        return (
            <g className={className}>
                <text className={valueClassName} x={half} y="54%" textAnchor="middle" fontSize="42" fill={centerColor}>
                    {formatValues(value, total)}
                    <tspan dy="-20" fontSize="23">
                        %
                    </tspan>
                </text>
            </g>
        );
    }
}

DonutInnerText.propTypes = {
    item: PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        isEmpty: PropTypes.bool
    }).isRequired,
    className: PropTypes.string,
    total: PropTypes.number,
    width: PropTypes.number,
    formatValues: PropTypes.func,
    centerColor: PropTypes.string
};

DonutInnerText.defaultProps = {
    item: {
        label: "",
        value: 100,
        isEmpty: true
    },
    total: 100,
    className: "donutchart-innertext",
    width: 500,
    formatValues: (value) => value,
    centerColor: "rgba(180, 180, 201, 0.01)"
};
