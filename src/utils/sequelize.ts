export function defaultOption(){
    return {
        freezeTableName: true,
        timestamps: false
    };
}

export function overrideDefaultOptions(options){
    return Object.assign({
        freezeTableName: true,
        timestamps: false
    }, options);
}