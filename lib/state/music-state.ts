import { proxy, useSnapshot } from "valtio";
import { useEffect } from "react";
import { subscribeKey } from "valtio/utils";

// 상태 타입 정의
// export type ChatbotListItem = WidgetSimple;
// export type WorkspaceItem = WorkspaceSimple;
// export type PaymentItem = PaymentSimple;
// export type HistoryListItem = ThreadSimple;
// export type AnalysisItem = AnalysisSimple;

export interface Account {
  label: string;
}
export interface HistoryListItem {
  historyId: number;
  historyTitle: string;
}

export const musicState = proxy({
  /**
   * 액세스 토큰
   */
  accessToken: null as string | null,

  historyList: [] as HistoryListItem[],
  /**
   * 현재 포커스된 챗봇 ID
   */
  focusedChatbotId: null as string | null,

  /**
   * 현재 포커스된 결제 ID
   */
  focusedPaymentId: null as string | null | undefined,

  /**
   * 현재 포커스된 워크스페이스 ID
   */
  focusedWorkspaceId: undefined as string | undefined,

  /**
   * 현재 포커스된 분석 인덱스
   */
  focusedAnalysisId: null as string | null,

  /**
   * 현재 포커스된 쓰레드(대화)
   */
  focusedThreadId: null as string | null,

  /**
   * 계정 목록
   * @todo: api로 계정 목록 가져오기
   */
  accounts: [
    {
      label: "개인계정",
    },
  ] as Account[],

  /**
   * 메뉴 뱃지 목록
   */
  menuBadges: {
    chatbot: "0",
    history: "0",
    connect: "0",
    payment: "0",
    workspace: "0",
    analysis: "0",
  } as Record<
    "chatbot" | "history" | "connect" | "payment" | "workspace" | "analysis",
    string
  >,

  /**
   * 로딩 상태
   */
  loading: false,

  /**
   * 에러 메시지
   */
  errorMessage: null as string | null,

  /**
   * @description: llm의 응답이 처리 중인지를 나타냅니다.
   */
  messageInProgress: false,
});

export class MusicActions {
  // private widgetService: WidgetService;
  // private workspaceService: WorkspaceService;
  // private llmService: LLMService;

  // constructor() {
  //   this.widgetService = new WidgetService(API_URL);
  //   this.workspaceService = new WorkspaceService(API_URL);
  //   this.llmService = new LLMService(LLM_WORKER_URL);
  // }

  setHistoryList(historyList: HistoryListItem[]) {
    musicState.historyList = historyList;
  }
  addHistoryItem(historyItem: HistoryListItem) {
    musicState.historyList.push(historyItem);
  }
  /**
   * 액세스 토큰을 설정하고, 서비스 인스턴스에 적용합니다.
   */
  setAccessToken(token: string) {
    musicState.accessToken = token;
  }

  /**
   * 포커스된 챗봇 ID를 설정합니다.
   */
  setFocusedChatbotId(id: string | null) {
    musicState.focusedChatbotId = id;
  }

  /**
   * 포커스된 워크스페이스 ID를 설정합니다.
   */
  setFocusedWorkspaceId(id?: string | null) {
    musicState.focusedWorkspaceId = id ?? undefined;
  }

  setFocusedPaymentId(id?: string | null) {
    musicState.focusedPaymentId = id;
  }

  /**
   * 메뉴 뱃지를 업데이트합니다.
   */
  setMenuBadge(key: keyof typeof musicState.menuBadges, value: string) {
    musicState.menuBadges[key] = value;
  }

  /**
   * 로딩 상태를 설정합니다.
   */
  setLoading(loading: boolean) {
    musicState.loading = loading;
  }

  /**
   * 에러 메시지를 설정합니다.
   */
  setErrorMessage(message: string | null) {
    musicState.errorMessage = message;
  }
}

export const useMusicState = () => useSnapshot(musicState);
export const musicActions = new MusicActions();
