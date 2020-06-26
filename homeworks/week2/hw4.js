function printFactor(n) {
    for (let i=1; i<=n; i++) {
        // 可整除
        if (n % i === 0) {
            console.log(i)
        }
    }
}

printFactor(10);
