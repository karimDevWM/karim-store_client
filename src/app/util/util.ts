export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=([^;]+)");
    return b ? b.pop() : "";
}

export function currencyFormat(amount: number){
    return '$' + (amount).toFixed(2);
}