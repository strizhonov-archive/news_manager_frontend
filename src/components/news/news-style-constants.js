export const authorSelect = {

    menu: base => ({
        ...base,
        background: "#4d535b"
    }),

    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px solid #acb6c3",
        color: state.isSelected ? "#ffffff" : "#b3b3b3",
        backgroundColor: state.isSelected ? "#3e4146" : "#4d535b",
        cursor: "pointer"
    }),

    control: base => ({
        ...base,
        color: "#b3b3b3",
        borderRadius: "3px",
        cursor: "pointer",
        background: "#4d535b",
        borderColor: "#878f9b",
    }),

    valueContainer: base => ({
        ...base,
        padding: "0 15px",
    }),

    singleValue: base => ({
        ...base,
        color: "white",

    }),

    placeholder: base => ({
        ...base,
        color: "#b3b3b3"
    })

};

export const tagsSelect = {

    chips: {
        marginLeft: "5px",
        background: "rgb(76, 103, 139)",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 15px 0 rgba(0, 0, 0, 0.24)",
    },

    searchBox: {
        borderColor: "#878f9b",
        padding: "10px 0",
    }

};