const isHtmlString = (str: string): boolean => {
    // Biểu thức chính quy để kiểm tra thẻ HTML
    const htmlRegex = /<[^>]+>/g;
    return htmlRegex.test(str);
};

const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
    const year = date.getFullYear().toString();
  
    return `${day}/${month}/${year}`;
};

export {formatDate, isHtmlString};