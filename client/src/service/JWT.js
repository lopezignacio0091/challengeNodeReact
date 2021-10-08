export default class JWT {

    static tokken;
    
    static Init(tokken) {
        this.tokken = tokken;
    }

    static getTokken() {
        return this.tokken;
    }

}