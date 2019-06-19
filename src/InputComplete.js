import React, { Component } from "react";
import Select from "react-select";

export default class InputComplete extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: (base, state) => ({
        ...base,
        ...this.props.styles,
        border: "none"
      }),
      control: (base, state) => ({
        ...base,
        borderRadius: "0",
        border: state.isFocused ? 0 : 0,
        borderBottom: state.isFocused?"2px solid #43a5aa":"2px solid gray",
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
          border: state.isFocused ? 0 : 0,
          borderBottom: "2px solid #43a5aa"
        }
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isDisabled ? "#6e707e" : base.color
      }),
      indicatorSeparator: (base, state) => ({
        ...base,
        backgroundColor: "transparent"
      })
    };
  }
  handleChange(value, fn) {
    let field = value ? (this.props.isMulti ? value.map(item => item.value) : value.value) : value;
    this.props.handleField(this.props.name, field);

    if (fn) {
      fn(field);
    }
  }
  selectRef = null;
  setSelectRef = ref => {
    this.selectRef = ref;
  };

  preencher(options, value, valueKey = "") {
    return options
      ? options.filter(item => {
          return value != null
            ? value.map
              ? value.filter(obj => {
                  return obj === item.value || obj[valueKey] === item.value;
                }).length > 0
              : value === item.value
            : false;
        })
      : [];
  }
  render() {
    let { required, options, isMulti = false, value, disabled } = this.props;
    return (
      <div className={`form-group input-search ${this.props.classe ? this.props.classe : ""}`}>
        <div>
          {this.props.title}
          {required ? <span style={{ color: "#ff8d0e" }}> *</span> : ""}
          {this.props.info ? (
            <div className="input-info">
              (?)
              <span className="rounded">
                <p>{this.props.info}</p>
                <i className="fas fa-sort-down" />
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <Select
            ref={this.setSelectRef}
            required={required}
            options={options}
            isMulti={isMulti}
            isDisabled={disabled}
            isClearable
            closeMenuOnSelect={!isMulti}
            placeholder="Selecione"
            styles={this.styles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#43a5aa",
                primary25: "rgba(67,165,170,0.4)"
              }
            })}
            className={`react-select-container ${this.props.className}`}
            onChange={value => this.handleChange(value, this.props.changeFields)}
            value={this.preencher(options, value, this.props.valueKey)}
          />
          {required && (
            <input
              style={{
                opacity: 0,
                width: "24%",
                height: 0,
                position: "absolute",
                transform: "translateX(14px)"
              }}
              name={this.props.name}
              onChange={() => {}}
              onFocus={() => this.selectRef.focus()}
              value={this.preencher(options, value, this.props.valueKey)}
              required={required}
            />
          )}
        </div>
      </div>
    );
  }
}
