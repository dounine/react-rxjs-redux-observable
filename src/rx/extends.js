import {Observable} from "rxjs/Rx";

Observable.prototype.retryWithDelay = function (maxRetry, initialDelay) {
    return this.retryWhen(err$ => {
        return err$.scan((errorCount, err) => {
            if (errorCount >= maxRetry) {
                throw err;
            }
            return errorCount + 1;
        }, 0).delayWhen(errorCount => {
            let delayTime = Math.pow(2, errorCount - 1) * initialDelay;
            return Observable.timer(delayTime);
        });
    })
}