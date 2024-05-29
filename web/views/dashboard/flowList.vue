<template>
    <div class="container">
        <div class="page-title">工作流列表</div>
        <a-button @click="addFlow()" :style="{marginLeft:'10px', marginBottom: '10px'}">
            <template #icon>
                <icon-plus />
            </template>
        </a-button>
        <div class="page-list">
            <a-table :columns="columns" :data="data">
                <template #handler="{ record }">
                    <a-button @click="router.push({
                        path: '/flow',
                        query: {
                            flowId: record.id,
                        }
                    })">查看</a-button>
                    <a-button @click="removeFlow(record.id)">删除</a-button>
                </template>
            </a-table>
        </div>
        <a-modal v-model:visible="addFormVisible" title="添加数据流" :on-before-ok="handleAddFlowOk">
            <a-form :model="addForm" :style="{ width: '300px' }">
                <a-form-item field="name" label="name">
                    <a-input
                        v-model="addForm.name"
                        placeholder="新增的数据流名称"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script setup lang="ts">
import { createFlow, deleteFlow, getFlowList } from '@/api/flow';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IconPlus } from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';
const router = useRouter();

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
    },
    {
        title: '操作',
        slotName: 'handler'
    },
];
const data = ref<Array<any>>([]);
onMounted(() => {
    fetchData();
});
function fetchData() {
    getFlowList().then((resp) => {
        console.log('>>>getFlowList result', resp);
        data.value = resp.data;
    });
}

// 新增数据流
const addFormVisible = ref(false);
const addForm = ref({
    name: '',
});
function addFlow() {
    addFormVisible.value = true;
}
async function handleAddFlowOk() {
    const result = await createFlow({
        name: addForm.value.name,
    });
    if (result.code === 0) {
        Message.success('创建成功');
        addFormVisible.value = false;
        resetAddForm();
        fetchData();
        return true;
    } else {
        Message.success('创建失败，请稍后重试');
        return false;
    }
}
function resetAddForm() {
    addForm.value = {
        name: '',
    };
}

async function removeFlow(FlowId: number) {
    const result = await deleteFlow(FlowId);
    if (result.code === 0) {
        Message.success('删除成功');
        fetchData();
    } else {
        Message.error('操作异常，请稍后重试');
    }
}


</script>
<style lang="less">
</style>