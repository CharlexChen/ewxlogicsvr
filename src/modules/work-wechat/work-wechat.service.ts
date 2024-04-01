/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { Observable, catchError, map, of } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { CommonService } from '../common/common.service';

@Injectable()
export class WorkWechatService {
  constructor(private readonly commonService: CommonService) {}
  getAccessToken(corpId = 'ww957f47bd9d12a88f', corpSecret = '') {
    // 获取企业微信ACT的文档｜https://developer.work.weixin.qq.com/document/path/91039
    return this.commonService.getByHttp(
      `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpId}&corpsecret=${corpSecret}`,
    );
  }
  sendMsgToGroup(groupKey = '') {
    // 群聊机器人文档｜https://developer.work.weixin.qq.com/document/path/99110#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BA
    const data = {
      // 支持文本（text）、markdown（markdown）、图片（image）、图文（news）、文件（file）、语音（voice）、模板卡片（template_card）七种消息类型
      // text/markdown类型消息支持在content中使用<@userid>扩展语法来@群成员
      msgtype: 'text',
      text: {
        content: 'hello world',
        // mentioned_list: ['wangqing', '@all'],
        // mentioned_mobile_list: ['13800001111', '@all'],
      },
    };
    return this.commonService.postByHttp(
      `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${groupKey}`,
      data,
    );
  }
  getCollectionInfo(accessToken: string, formId = '') {
    // ALUAewf9AD0AY0AxwY6AHw8T0hN6cOSRf
    // 获取收集表信息｜https://qyapi.weixin.qq.com/cgi-bin/wedoc/get_form_info?access_token=ACCESS_TOKEN
    return this.commonService.postByHttp(
      `https://qyapi.weixin.qq.com/cgi-bin/wedoc/get_form_info?access_token=${accessToken}&debug=1`,
      {
        formid: formId,
      },
    );
  }
}
