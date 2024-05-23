<template>
    <div class="container">
        <div class="page-title">工作流设计</div>
        <a-row class="list-row" :gutter="24">
            <a-col :key="'Id-1'" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6" class="list-col" style="min-height: 162px">
                <CardWrap
                    :loading="false"
                    title="数据源"
                    description="导入需要分析的数据"
                    :default-value="defaultValue"
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
                        @change="onChange"
                        :multiple="false"
                        :limit="1"
                    >
                        <template #upload-button>
                            <a-space direction="vertical">
                                <a-button>选择文件</a-button>
                            </a-space>
                        </template>
                    </a-upload>
                </CardWrap>
            </a-col>
            <a-col :key="'Id-2'" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6" class="list-col" style="min-height: 162px">
                <CardWrap
                    :loading="false"
                    title="数据指标"
                    description="定义数据处理逻辑"
                    :action-type="''"
                    :expires="false"
                    :tag-text="'已完成'"
                    :open="indicatorOpen"
                >
                    <div style="margin-top: 16px;">
                        <a-button @click="indicatorFormvisible = true">设置条件</a-button>
                    </div>
                </CardWrap>
                <a-modal v-model:visible="indicatorFormvisible" title="设置指标" width="600px" @cancel="onIndicatorFormCanCel" :on-before-ok="handleBeforeOk">
                    <a-form :model="indicatorForm">
                        <a-form-item field="indicatorName" label="指标名称">
                            <a-input v-model="indicatorForm.indicatorName" />
                        </a-form-item>
                        <!-- <a-form-item field="post" label="Post">
                            <a-select v-model="form.post">
                                <a-option value="post1">Post1</a-option>
                                <a-option value="post2">Post2</a-option>
                                <a-option value="post3">Post3</a-option>
                                <a-option value="post4">Post4</a-option>
                            </a-select>
                        </a-form-item> -->
                        <a-form-item v-for="(item, index) of indicatorForm.conditions" :field="`conditions[${index}].value`" :label="`条件-${index + 1}`" >
                            <a-input-group>
                                <a-input v-model="item.key" :style="{ width:'150px' }" placeholder="字段名称" />
                                <a-select v-model="item.relation" :options="['=','in']" :style="{ width:'120px' }" placeholder="关系" />
                                <a-input v-model="item.value" placeholder="匹配值" />
                            </a-input-group>
                            <a-button v-if="indicatorForm.conditions.length > 1" @click="handleDeleteCondition(index)" :style="{marginLeft:'10px'}">删除</a-button>
                        </a-form-item>
                    </a-form>
                    <div>
                        <a-button @click="handleAddCondition">添加条件</a-button>
                    </div>
                </a-modal>
            </a-col>
        </a-row>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CardWrap from './components/card-wrap.vue';
import { Message } from '@arco-design/web-vue';
const defaultValue = ref(false);
const tagText = ref('已导入');
const openTxt = ref('确认导入');
const closeTxt = ref('取消');

const uploadRef = ref();
const files = ref([]);
function onChange(fileList: any) {
    files.value = fileList;
};
// const submit = (event: any) => {
//     event.stopPropagation();
//     uploadRef.value.submit();
// };

const indicatorFormvisible = ref(false);
const indicatorForm = ref({
    indicatorName: '',
    conditions: [{
        key: '',
        relation: '',
        value: '',
    }],
});
const indicatorOpen = ref(false);
function handleAddCondition() {
    indicatorForm.value.conditions.push({
        key: '',
        relation: '',
        value: ''
    })
}
function handleDeleteCondition(index: number) {
    indicatorForm.value.conditions.splice(index, 1);
}
function onIndicatorFormCanCel() {
    indicatorForm.value = {
        indicatorName: '',
        conditions: [{
            key: '',
            relation: '',
            value: '',
        }],
    };
    indicatorOpen.value = false;
}
async function handleBeforeOk() {
    if (!indicatorForm.value.indicatorName) {
        Message.warning('名称不能为空');
        return false;
    }
    if (!indicatorForm.value.conditions[0].key) {
        Message.warning('条件为空');
        return false;
    }
    Message.success('设置成功');
    indicatorOpen.value = true;
    return true;
};


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
</style>