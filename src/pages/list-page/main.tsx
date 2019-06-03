const sleep = t => new Promise(resolve => setTimeout(resolve, t))
console.log(sleep(1000))
async function run () {
    console.log("开始等待")
    await sleep(2000)
    console.log('等待完成')
}
run()