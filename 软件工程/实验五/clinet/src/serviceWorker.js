/*
 * @Author: zhangl
 * @Date: 2019-08-23 17:07:48
 * @LastEditors: zhangl
 * @LastEditTime: 2019-08-23 18:35:10
 * @Description: serviceWorker实现PWA
 */
module.exports = {
    register() { // 注册
        if (NODE_ENV === 'prod' && 'serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('SW registered: ', registration.scope);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    },
    unregister() { // 解除注册
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
    },
};
