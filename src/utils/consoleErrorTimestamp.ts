function padDatePart(str: number) {
  return ('0' + str).slice(-2);
}

export function consoleErrorTimestamp(message: any) {
  const now = new Date();
  console.error(
    /* tslint:disable:max-line-length */
    `${now.getFullYear()}-${padDatePart(now.getMonth() + 1)}-${padDatePart(now.getDate())} ${padDatePart(now.getHours())}:${padDatePart(now.getMinutes())}:${padDatePart(now.getSeconds())}`,
    /* tslint:enable:max-line-length */
    message,
  );
}
