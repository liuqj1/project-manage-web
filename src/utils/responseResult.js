

export function setResult(res){
    let response = res.data;
    // console.log(response)
    // if(response.code==200){
    //     this.$message({
    //         message: response.message,
    //         type: "success",
    //     });
    //     // console.log(code)
    // }
    // else {
    //     this.$message({
    //         message: response.message,
    //         type: "error",
    //     });
    //     // console.log(code)
    // }
    //
    // return;
    if (response.code != 200) {
        this.$message({
            message: response.message,
            type: "error",
        });
        return response;
    }
    return response;
}
