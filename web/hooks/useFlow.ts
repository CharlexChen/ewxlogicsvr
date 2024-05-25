import { ITransferData, transferData } from "@/hooks/flow";
import { ref } from "vue";

interface IFlowItem {
    type: 'import' | 'transfer' | 'extract' | 'notice',
    files?: Array<any>;
    transferData?: ITransferData;
    noticeData?: any;
}
export function useFlow() {
    const currentFlowIndex = ref(0);
    const flowList = ref<Array<IFlowItem>>([
        {
            type: 'import',
            files: [],
        },
        {
            type: 'transfer',
            transferData: undefined,
        },
    ]);
    const previewData = ref([]);
    const resultPreviewVisible = ref(false);
    const resultColumn = ref<Array<{
        dataIndex: string;
        title: string;
    }>>([]);
    const resultData = ref<any[]>([]);
    let finalData: any[] = [];
    function onFlowTransferAdd() {
        flowList.value.push({
            type: 'transfer',
            transferData: undefined,
        });
    }
    function onFlowPreview() {
        // console.log('>>>预览数据', transferData(previewData.value, flowList.value[1].transferData));
        finalData = previewData.value.slice();
        flowList.value?.forEach((item) => {
            if (item.type === 'transfer') {
                finalData = transferData(finalData, item.transferData);
            }
        });
        if (finalData && finalData?.length) {
            resultColumn.value = Object.keys(finalData[0]).map((ele) => ({
                dataIndex: ele,
                title: ele,
            }))
            resultData.value = finalData;
            console.log('>>>preview data', finalData);
            resultPreviewVisible.value = true;
        }
    }
    function onDataShareAdd() {
        console.log('>>>推送数据，企业微信群聊、其他系统');
        flowList.value.push({
            type: 'notice',
            noticeData: undefined,
        });
    }
    function onFlowDel(index: number) {
        flowList.value.splice(index, 1);
    }
    return {
        currentFlowIndex,
        flowList,
        previewData,
        resultPreviewVisible,
        resultColumn,
        resultData,
        onFlowTransferAdd,
        onFlowPreview,
        onDataShareAdd,
        onFlowDel,
    }
}