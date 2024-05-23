<template>
    <div class="container">
        <div class="page-title">工作流设计</div>
        <a-row class="list-row" :gutter="24">
            <template v-for="(ele, index) in flowList">
                <a-col v-if="ele.type === 'import'" :key="'Id-1'" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6" class="list-col" style="min-height: 162px">
                    <CardWrap
                        :loading="false"
                        title="数据源"
                        description="导入需要分析的数据"
                        :action-type="''"
                        :expires="false"
                        :open-txt="openTxt"
                        :close-txt="closeTxt"
                        :tag-text="tagText"
                        :expires-text="'expires-text'"
                        :expires-tag-text="'expires-tag-text'"
                    >
                        <template #skeleton>
                            <a-skeleton :animation="true">
                                <a-skeleton-line :widths="['100%', '40%', '100%']" :rows="3" />
                                <a-skeleton-line :widths="['40%']" :rows="1" />
                            </a-skeleton>
                        </template>
                        <a-upload
                            style="margin-top: 16px;"
                            action="/"
                            :auto-upload="false"
                            ref="uploadRef"
                            v-model:file-list="fileListRaw"
                            @change="onFileSelectChange"
                            :multiple="false"
                            :limit="1"
                        >
                            <template #upload-button>
                                <a-space direction="vertical">
                                    <a-button>选择文件</a-button>
                                </a-space>
                            </template>
                        </a-upload>
                        <a-button v-if="fileListRaw.length" @click="previewVisible = true">预览</a-button>
                    </CardWrap>
                </a-col>
                <a-col v-if="ele.type === 'transfer'" :key="'Id-2'" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6" class="list-col" style="min-height: 162px">
                    <CardWrap
                        :loading="false"
                        title="数据处理"
                        description="定义数据处理逻辑"
                        :action-type="''"
                        :expires="false"
                        :tag-text="'已完成'"
                        :open="!!ele.transferData"
                    >
                        <div style="margin-top: 16px;">
                            <a-button type="primary" @click="onDataFormBtnClick(index)">设置条件</a-button>
                            <a-button @click="onFlowDel(index)">删除</a-button>
                        </div>
                    </CardWrap>
                </a-col>
                <a-col v-if="ele.type === 'notice'" :key="'Id-2'" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6" class="list-col" style="min-height: 162px">
                    <CardWrap
                        :loading="false"
                        title="数据通知"
                        description="定义数据通知逻辑"
                        :action-type="''"
                        :expires="false"
                        :tag-text="'已完成'"
                        :open="!!ele.noticeData"
                    >
                        <div style="margin-top: 16px;">
                            <a-button type="primary" @click="onNoticeBtnClick(index)">设置</a-button>
                            <a-button @click="onFlowDel(index)">删除</a-button>
                        </div>
                    </CardWrap>
                </a-col>
            </template>
            <a-col
                :xs="12"
                :sm="12"
                :md="12"
                :lg="6"
                :xl="6"
                :xxl="6"
                class="list-col"
            >
                <CardWrap
                    :loading="false"
                    title="更多操作"
                    description="执行更多操作"
                    :action-type="''"
                    :expires="false"
                >
                    <a-space style="flex-wrap: wrap;">
                        <a-button @click="onFlowAdd">+数据处理</a-button>
                        <a-button @click="onDataShareAdd">+数据通知</a-button>
                        <a-button @click="onFlowPreview">数据预览</a-button>
                    </a-space>
                </CardWrap>
            </a-col>
        </a-row>
        <a-modal v-model:visible="dataFormVisible" title="设置指标" fullscreen @cancel="onDataFormCanCel" :on-before-ok="handleDataFormBeforeOk">
            <a-form :model="dataForm">
                <a-form-item v-if="!dataForm.conditions.length" label="筛选条件">
                    <a-button @click="handleAddCondition()" :style="{marginLeft:'10px'}">添加筛选条件</a-button>
                </a-form-item>
                <a-form-item v-for="(item, index) of dataForm.conditions" :field="`conditions[${index}].value`" :label="`条件-${index + 1}`" >
                    <a-input-group>
                        <a-select v-if="headerList.length" v-model="item.key" :style="{width:'320px'}" placeholder="Please select ...">
                            <a-option v-for="ele in headerList" :value="ele">{{ele}}</a-option>
                        </a-select>
                        <a-input v-else v-model="item.key" :style="{ width:'150px' }" placeholder="字段名称" />
                        <a-select v-model="item.relation" :options="['=', '>', '<','in', 'like']" :style="{ width:'120px' }" placeholder="关系" />
                        <a-input v-model="item.value" placeholder="匹配值" />
                    </a-input-group>
                    <a-button @click="handleAddCondition()" :style="{marginLeft:'10px'}">
                        <template #icon>
                            <icon-plus />
                        </template>
                    </a-button>
                    <a-button @click="handleDeleteCondition(index)" :style="{marginLeft:'10px'}">
                        <template #icon>
                            <icon-minus />
                        </template>
                    </a-button>
                    <!-- <a-button @click="handleAddCondition()" :style="{marginLeft:'10px'}">加</a-button> -->
                    <!-- <a-button v-if="dataForm.conditions.length > 1" @click="handleDeleteCondition(index)" :style="{marginLeft:'10px'}">删</a-button> -->
                </a-form-item>
                <a-form-item label="聚合分析">
                    <a-switch v-model="dataForm.polymerization.enable" @change="onPolymerizationSwitch"></a-switch>
                </a-form-item>
                <a-form-item v-if="dataForm.polymerization.enable" label="统计算法">
                    <a-select v-model="dataForm.polymerization.arithmeticValue" :style="{width:'160px'}" placeholder="Select" :trigger-props="{ autoFitPopupMinWidth: true }">
                        <a-option v-for="item in arithmeticList" :value="item.value">{{ item.name }}</a-option>
                    </a-select>
                    <span v-if="dataForm.polymerization.enable && dataForm.polymerization.arithmeticValue && dataForm.polymerization.arithmeticValue !== 'count'" label="统计字段">
                        <a-input type="text" v-model="dataForm.polymerization.statisticalField" placeholder="统计字段" />
                    </span>
                </a-form-item>
                <a-form-item v-if="dataForm.polymerization.enable" label="展开字段">
                    <!-- :default-value="['test']" -->
                    <a-input-tag v-model="dataForm.polymerization.expandField" :style="{width:'320px'}" placeholder="请输入展开字段，输入并回车即生成一个字段标签" allow-clear/>
                </a-form-item>
                <a-form-item v-if="dataForm.polymerization.enable" label="聚合结果排序">
                    <a-switch v-model="dataForm.polymerization.sort">
                        <template #checked>
                            升序
                        </template>
                        <template #unchecked>
                            降序
                        </template>
                    </a-switch>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="noticeFormVisible" title="设置通知" fullscreen @cancel="resetNoticeForm" :on-before-ok="handleNoticeFormBeforeOk">
            <a-form :model="noticeForm">
                <a-form-item label="webhook">
                    <a-input v-model="noticeForm.webhook" :style="{width:'320px'}" placeholder="请输入webhook" allow-clear/>
                </a-form-item>
                <a-form-item label="method">
                    <a-select v-model="noticeForm.method" :style="{width:'160px'}" placeholder="Select" :trigger-props="{ autoFitPopupMinWidth: true }">
                        <a-option v-for="item in methodList" :value="item">{{ item }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="query">
                    <a-input v-model="noticeForm.query" :style="{width:'320px'}" placeholder="请输入query" allow-clear/>
                </a-form-item>
                <a-form-item label="body">
                    <a-input v-model="noticeForm.body" :style="{width:'320px'}" placeholder="请输入body" allow-clear/>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="previewVisible" title="预览" fullscreen>
            <a-table :columns="columns" :data="previewData" />
        </a-modal>
        <a-modal v-model:visible="resultPreviewVisible" title="结果预览" fullscreen>
            <a-table :columns="resultColumn" :data="resultData" />
        </a-modal>
        <!-- <a-modal v-model:visible="previewVisible" title="预览" fullscreen>
            <vue-office-excel
                :src="excel"
                style="height: 100vh;"
                @rendered="renderedHandler"
                @error="errorHandler"
            />
        </a-modal> -->
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CardWrap from './components/card-wrap.vue';
import { Message } from '@arco-design/web-vue';
//引入VueOfficeExcel组件
// import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
// import '@vue-office/excel/lib/index.css'
import * as XLSX from 'xlsx';
import { ITransferData, transferData } from './flow';
import { IconPlus, IconMinus } from '@arco-design/web-vue/es/icon';

// 预览数据
const previewVisible = ref(false);
const columns = ref([
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Salary',
        dataIndex: 'salary',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
]);
const previewData = ref([]);

const resultPreviewVisible = ref(false);
const resultColumn = ref<Array<{
    dataIndex: string;
    title: string;
}>>([]);
const resultData = ref<any[]>([]);
function onFlowAdd() {
    flowList.value.push({
        type: 'transfer',
        transferData: undefined,
    });
}

let finalData: any[] = [];
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
interface IFlowItem {
    type: 'import' | 'transfer' | 'extract' | 'notice',
    files?: Array<any>;
    transferData?: ITransferData;
    noticeData?: any;
}
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
const tagText = ref('已导入');
const openTxt = ref('确认导入');
const closeTxt = ref('取消');

const uploadRef = ref();
const fileListRaw = ref([]);
function fileToBlob(file: Blob) {  
    return new Promise((resolve, reject) => {  
        const reader = new FileReader();  
        reader.onload = function(event: any) {
            // 这里我们实际上创建了一个新的Blob对象，它包含与原始File对象相同的数据  
            // 但这通常是不必要的，因为你可以直接使用File对象作为Blob  
            // resolve(new Blob([new Uint8Array(event.target.result)], { type: file.type }));
            const data = new Uint8Array(event.target.result);  
            const workbook = XLSX.read(data, { type: 'array' });  
            // 获取第一个工作表（Sheet）  
            const worksheetName = workbook.SheetNames[0];  
            const worksheet = workbook.Sheets[worksheetName];  
            // 将工作表转换为 JSON 对象数组  
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // 假设第一行是标题行  
            resolve(jsonData); // 输出 JSON 数据  
        };
        reader.onerror = reject;  
        reader.readAsArrayBuffer(file);  
    });  
}  
const headerList = ref([]);
function onFileSelectChange(fileList: any) {
    const fileInfo = fileList[0].file;
    fileToBlob(fileInfo).then((res: any) => {
        const headerRow = res[0];
        headerList.value = headerRow;
        columns.value = headerRow.map((item: string) => ({
            title: item,
            dataIndex: item,
        }))
        const dataRows = res.slice(1);
        console.log('>>>fileList', headerRow, dataRows);
        const preData: any = [];
        dataRows.forEach((item: string) => {
            if (!item.length) return ;
            const info: any = {};
            headerRow.forEach((ele: string, index: number) => {
                info[ele] = item[index];
            });
            preData.push(info);
        });
        previewData.value = preData;
        console.log('>>>preData', preData);
    })
    currentFlowIndex.value = 0;
    flowList.value[currentFlowIndex.value].files = fileList;
};
// const submit = (event: any) => {
//     event.stopPropagation();
//     uploadRef.value.submit();
// };
// 设置数据转换逻辑
const dataFormVisible = ref(false);
const dataForm = ref<ITransferData>({
    conditions: [],
    polymerization: {
        enable: false,
        arithmeticValue: '',
        statisticalField: '',
        expandField: [],
        sort: 0,
    }
});
// ---聚合能力---
// const openPolymerization = ref(false);
const arithmeticList = ref([
    {
        name: '总数',
        value: 'count',
    },
    {
        name: '求和',
        value: 'sum',
    },
    {
        name: '求平均',
        value: 'average',
    },
    {
        name: '最大值',
        value: 'max',
    },
    {
        name: '最小值',
        value: 'min',
    },
]);

function onPolymerizationSwitch(bool: boolean) {
    console.log('>>>onPolymerizationSwitch', bool);
    dataForm.value.polymerization.arithmeticValue = bool ? 'count' : '';
}
function onDataFormBtnClick(index: number) {
    dataFormVisible.value = true;
    currentFlowIndex.value = index;
    if (flowList.value[currentFlowIndex.value].transferData) {
        dataForm.value = flowList.value[currentFlowIndex.value].transferData as ITransferData;
    }
}

function handleAddCondition() {
    dataForm.value.conditions.push({
        key: '',
        relation: '',
        value: '',
    });
}
function handleDeleteCondition(index: number) {
    dataForm.value.conditions.splice(index, 1);
}
function resetDataForm() {
    dataForm.value = {
        conditions: [],
        polymerization: {
            enable: false,
            arithmeticValue: '',
            statisticalField: '',
            expandField: [],
            sort: 0,
        }
    };
}
function onDataFormCanCel() {
    resetDataForm();
}
async function handleDataFormBeforeOk() {
    dataForm.value.conditions = dataForm.value.conditions.filter((item) => item.key);
    const conditionEmpty = !dataForm.value.conditions?.length;
    const polymerizationEmpty = !dataForm.value.polymerization.arithmeticValue;
    if (conditionEmpty && polymerizationEmpty) {
        Message.warning('条件、聚合条件皆空');
        return false;
    }
    Message.success('设置成功');
    flowList.value[currentFlowIndex.value].transferData = dataForm.value;
    resetDataForm();
    return true;
};

// 设置数据通知能力
interface INoticeForm {
    webhook: string;
    method: string;
    headers: string;
    query: string;
    body: string;
}
const noticeFormVisible = ref(false);
const noticeForm = ref<INoticeForm>({
    webhook: '',
    method: 'GET',
    headers: '',
    query: '',
    body: '',
});
const methodList = ref(['GET', 'POST']);
function onNoticeBtnClick(index: number) {
    currentFlowIndex.value = index;
    noticeFormVisible.value = true;
    if (flowList.value[currentFlowIndex.value].noticeData) {
        noticeForm.value = flowList.value[currentFlowIndex.value].noticeData as INoticeForm;
    }
}
function resetNoticeForm() {
    noticeForm.value = {
        webhook: '',
        method: 'GET',
        headers: '',
        query: '',
        body: '',
    };
}
async function handleNoticeFormBeforeOk() {
    const webhookEmpty = !noticeForm.value.webhook;
    if (webhookEmpty) {
        Message.warning('webhook不可为空');
        return false;
    }
    Message.success('设置成功');
    flowList.value[currentFlowIndex.value].noticeData = noticeForm.value;
    resetNoticeForm();
    return true;
};


// const excel = ref('');
// function renderedHandler() {
//     console.log("渲染完成");
// };
// function errorHandler() {
//     console.log("渲染失败");
// }

</script>
<style lang="less">
.container {
    :deep(.arco-list-content) {
        overflow-x: hidden;
    }

    :deep(.arco-card-meta-title) {
        font-size: 14px;
    }
}

:deep(.arco-list-col) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

:deep(.arco-list-item) {
    width: 33%;
}

:deep(.block-title) {
    margin: 0 0 12px 0;
    font-size: 14px;
}

:deep(.list-wrap) {

    // min-height: 140px;
    .list-row {
        align-items: stretch;

        .list-col {
            margin-bottom: 16px;
        }
    }

    :deep(.arco-space) {
        width: 100%;

        .arco-space-item {
            &:last-child {
                flex: 1;
            }
        }
    }
}
// .card-wrap {
//     height: 100%;
//     transition: all 0.3s;
//     border: 1px solid var(--color-neutral-3);
//     &:hover {
//       transform: translateY(-4px);
//     }
//     :deep(.arco-card-meta-description) {
//       color: rgb(var(--gray-6));
//       .arco-descriptions-item-label-inline {
//         font-weight: normal;
//         font-size: 12px;
//         color: rgb(var(--gray-6));
//       }
//       .arco-descriptions-item-value-inline {
//         color: rgb(var(--gray-8));
//       }
//     }
// }
.empty-wrap {
    height: 200px;
    border-radius: 4px;
    :deep(.arco-card) {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      .arco-result-title {
        color: rgb(var(--gray-6));
      }
    }
}
</style>