//Utils Functions

export const setObjectValue = (path, value, obj = {}) => {
    const lastKey = path.pop();
    let curr = obj;
    for (let key of path) {
        curr = curr[key] = curr[key] || {};
    }
    curr[lastKey] = value;
    return obj;
};
export const getObjectValue = (item, value) => {
    if (!value || !item) return null;
    return value.length <= 1 ? item[value] : getObjectValue(item[value.shift()], value);
};
export function setProps(childs, props, name) {
    if (childs.length < 1) return false;
    if (childs.map) {
        if (name) {
            childs = childs.map((item, key) => {
                if(item.props.name === name) {
                    return {
                        ...item,
                        props: {...item.props, [props["name"]]: props["value"]}
                    };
                } else return {...item}
            });
        } else {
            childs = childs.map((item, key) => ({
                ...item,
                props: { ...item.props, [props["name"]]: props["value"] }
            }));
        }
    } else {
        childs = {
            ...childs,
            props: { ...childs.props, [props["name"]]: props["value"] }
        };
    }
    return childs;
}
export function getProps(childs, prop, name) {
    let value = false;
    if (childs.length < 1) return value;
    if (childs.map) {
        if(name){
             childs.map((item, key) => {
                if(item.props.name === name) {
                    value = item.props[prop];
                }
                return true;
            });
        } else {
            value = childs.map(item => {
                return item.props[prop];
            })
        }
    } else {
        value = childs.props[prop];
    }
    return value;
}

export const maxLength = (value = "", max) => {
    if(value.length > max){
        return "Número máximo de strings ultrapassado"
    }
    return false;
};
export const minLength = (value = "", min) => {
    if(value.length < min){
        return "Número mínimo de strings não alcançado"
    }
    return false;
};
export const required = (value = "") => {
    if(value.length === 0){
        return "Valor Necessário"
    }
    return false;
};
