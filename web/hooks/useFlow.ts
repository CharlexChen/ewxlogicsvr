import { ITransferData, transferData } from "@/hooks/flow";
import { ref } from "vue";
// interface IFlow {
//     pipeId?: number;
//     pipeName: string;
//     flow: string;
//     pipeLine: Array<{
//         name: string;
//         stages: Array<{
//             driven: 'AUTO' | 'MANUAL';
//             jobs: Array<{
//                 displayName: string;
//                 identifier: string;
//                 type: string;
//                 params: IFlowItem;
//             }>;
//         }>;
//     }>;
// }
export interface IPluginForm {
    type: string;
    params: {
        ewxOptions: {
            title: string;
            rowTemplate: string;
        };
        webhook: string;
        method: string;
        headers: string;
        query: string;
        body: string;
    }
}
interface IFlowJobParams {
    type: 'import' | 'transfer' | 'notice';
    files?: Array<any>;
    transferData?: ITransferData;
    noticeData?: any;
}
interface IFlowItem {
    stageName: string;
    stageType: 'import' | 'custom';
    imports: Array<{
        files: Array<any>;
    }>;
    stages: Array<{
        driven: 'AUTO' | 'MANUAL';
        jobs: Array<{
            identifier?: string;
            displayName: string;
            type: 'transfer';
            params: IFlowJobParams;
            plugins: Array<IPluginForm>;
        }>;
    }>;
}
interface ICurrent {
    flowIndex: number;
    stageIndex: number;
    jobIndex: number;
}
export function useFlow() {
    const current = ref<ICurrent>({
        flowIndex: 0,
        stageIndex: 0,
        jobIndex: 0,
    });
    const flowList = ref<Array<IFlowItem>>([
        {
            stageName: '数据源',
            stageType: 'import',
            imports: [
                {
                    files: [],
                }
            ],
            stages: [],
        },
        {
            stageName: '数据转换',
            stageType: 'custom',
            stages: [
                {
                    driven: 'AUTO',
                    jobs: [
                        {
                            displayName: '数据转换逻辑',
                            type: 'transfer',
                            params: {
                                type: 'transfer',
                                transferData: undefined,
                            },
                            plugins: [],
                        }
                    ],
                },
            ],
            imports: [],
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
    function onFlowStageAdd() {
        flowList.value.push({
            stageName: '未命名阶段',
            stageType: 'custom',
            stages: [
                {
                    driven: 'AUTO',
                    jobs: [],
                }
            ],
            imports: [],
        });
    }
    function onFlowTransferAdd(index: number) {
        flowList.value[index].stages.push({
            driven: 'AUTO',
            jobs: [
                {
                    displayName: '数据转换逻辑',
                    type: 'transfer',
                    params: {
                        type: 'transfer',
                        transferData: undefined,
                    },
                    plugins: [],
                }
            ],
        });
    }
    function onFlowPreview() {
        // console.log('>>>预览数据', transferData(previewData.value, flowList.value[1].transferData));
        finalData = previewData.value.slice();
        flowList.value?.forEach((item) => {
            item.stages?.forEach(ele => {
                if (ele.driven === 'AUTO') {
                    ele.jobs?.forEach((it) => {
                        if (it.type === 'transfer') {
                            finalData = transferData(finalData, it.params?.transferData);
                        }
                    });
                }
            })
            
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
        // flowList.value.push({
        //     type: 'notice',
        //     noticeData: undefined,
        // });
    }
    function onFlowDel(index: number, stageIndex: number, jobIndex: number) {
        flowList.value[index].stages[stageIndex].jobs.splice(jobIndex, 1);
    }
    function saveFlow() {
        console.log('>>>保存工作流');
        // const flowData: IFlow = {
        //     pipeId: 0,
        //     pipeName: 'test',
        //     pipeLine: [],
        // };
    }
    function onFlowJobAdd(index: number, stageIndex: number) {
        flowList.value[index].stages[stageIndex].jobs.push({
            displayName: '数据转换逻辑',
            type: 'transfer',
            params: {
                type: 'transfer',
                transferData: undefined,
            },
            plugins: [],
        });
    }
    return {
        current,
        flowList,
        previewData,
        resultPreviewVisible,
        resultColumn,
        resultData,
        onFlowTransferAdd,
        onFlowStageAdd,
        onFlowPreview,
        onDataShareAdd,
        onFlowDel,
        saveFlow,
        onFlowJobAdd,
    }
}