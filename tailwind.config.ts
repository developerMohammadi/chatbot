module.exports = {
    content: [
        './src/app/**/*.{ts,tsx,js,jsx}',
        './src/components/**/*.{ts,tsx,js,jsx}',
        // ... سایر مسیرها
    ],
    theme: {
        extend: {
            fontFamily: {
                // اینجا یک کلید جدید تعریف می‌کنیم
                peyda: ['var(--font-peyda)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}