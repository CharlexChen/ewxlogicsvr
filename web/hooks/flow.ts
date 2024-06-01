export interface ITransferData {
    conditions: {
        key: string;
        relation: string;
        value: string;
    }[];
    polymerization: {
        enable: boolean;
        arithmeticValue: string;
        statisticalField: string;
        expandField: string[];
        sort?: 0 | 1;
    };
    sortField?: string;
    sort?: 0 | 1;
    limit?: number;
}
export const transferData = (list: any[], options?: ITransferData) => {
    if (!options) {
        return list;
    }
    let resultList = list.filter((item) => {
        return options?.conditions?.every((ele) => {
            switch (ele.relation) {
                case '=':
                    return item[ele.key] == ele.value
                case '>':
                    return item[ele.key] > ele.value
                case '<':
                    return item[ele.key] < ele.value
                case 'in':
                    const arr = ele.value?.split(';') || [];
                    return arr.includes(item[ele.key]);
                case 'like':
                    return item[ele.key] == ele.value
                default:
                    return true;
            }
        });
    }) || [];
    if (options.sortField) {
        const num = options?.sort ? 1 : -1;
        resultList = resultList?.sort((itemA, itemB) => itemA[options.sortField as string] > itemB[options.sortField as string] ? num : -num) || [];
    }
    if (!options?.polymerization.arithmeticValue || !options?.polymerization.enable) {
        if (options?.limit) return resultList.slice(0, options?.limit);
        return resultList;
    }
    const obj: Record<string, number> = {};
    const objCount: Record<string, number> = {};
    // options.polymerization.expandField?.forEach((ele) => {
    // });
    // const polyStr = options.polymerization.expandField?.join('-');
    resultList.forEach((item) => {
        const arrList: string[] = [];
        options.polymerization.expandField?.forEach((ele) => {
            arrList.push(item[ele] + '');
        });
        if (!obj[arrList.join('-')]) {
            obj[arrList.join('-')] = 0;
            objCount[arrList.join('-')] = 0;
            if (options.polymerization.arithmeticValue === 'min') {
                obj[arrList.join('-')] = Number.MAX_SAFE_INTEGER;
            }
            if (options.polymerization.arithmeticValue === 'max') {
                obj[arrList.join('-')] = Number.MIN_SAFE_INTEGER;
            }
        }
        obj[arrList.join('-')] = dataHandler(options, obj[arrList.join('-')], item);
        objCount[arrList.join('-')] += 1;
    });
    const keys = options.polymerization.expandField?.map((ele) => ele).join('-');
    const resList = Object.keys(obj)?.map((item) => {
        let value = obj[item];
        const count = objCount[item];
        if (options.polymerization.arithmeticValue === 'average') {
            value = value / count;
        }
        return {
            [keys]: item,
            value,
        };
    })?.sort((itemA, itemB) => {
        let bool = itemA.value < itemB.value;
        if (options.polymerization.sort) {
            bool = !bool;
        }
        return bool ? 1 : -1
    }) || [];
    if (options?.limit) return resList.slice(0, options?.limit);
    return resList;
};

const dataHandler = (options: ITransferData, num: number, item: any): number => {
    switch (options.polymerization.arithmeticValue) {
        case 'count':
            return num + 1;
        case 'sum':
            return num + item[options.polymerization.statisticalField];
        case 'average':
            return num + item[options.polymerization.statisticalField];
        case 'max':
            return item[options.polymerization.statisticalField] > num ? item[options.polymerization.statisticalField] : num;
        case 'min':
            return item[options.polymerization.statisticalField] < num ? item[options.polymerization.statisticalField] : num;
    }
    return num + 1;
}
