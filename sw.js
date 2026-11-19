/* 카봇 모닝 — 알림 전용 서비스 워커
   · 캐시하지 않습니다(항상 최신 대시보드를 불러옵니다)
   · 안드로이드 Chrome·삼성 인터넷·홈 화면 웹앱에서 상단 시스템 알림을 띄우는 역할만 합니다
*/
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil((async () => {
    try {
      const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const c of list) {
        if ('focus' in c) {
          try { await c.focus(); } catch (e) {}
          return;
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    } catch (e) {}
  })());
});

self.addEventListener('notificationclose', () => { /* no-op */ });
