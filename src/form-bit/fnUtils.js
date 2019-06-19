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

export function flattenObject(ob) {
    let toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
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
