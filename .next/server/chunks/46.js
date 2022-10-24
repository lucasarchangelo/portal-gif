exports.id = 46;
exports.ids = [46];
exports.modules = {

/***/ 7509:
/***/ ((module) => {

// Exports
module.exports = {
	"shadow_nav": "Navbar_shadow_nav__dgQ_c",
	"text_color_menu_on": "Navbar_text_color_menu_on__N39PC",
	"text_color_menu_off": "Navbar_text_color_menu_off__Hnmja"
};


/***/ }),

/***/ 46:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/styles/Navbar.module.css
var Navbar_module = __webpack_require__(7509);
var Navbar_module_default = /*#__PURE__*/__webpack_require__.n(Navbar_module);
// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(1831);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/helpers/solana_helper.ts + 2 modules
var solana_helper = __webpack_require__(4301);
;// CONCATENATED MODULE: ./src/components/Nav.tsx






const Nav = ()=>{
    const { 0: connected , 1: setConnected  } = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        solana_helper/* SolanaHelper.Instance.web3Objects.subscribe */.M.Instance.web3Objects.subscribe((result)=>{
            setConnected(result.connected);
        });
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Menu, {
        className: (Navbar_module_default()).shadow_nav,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/",
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Menu.Item, {
                    header: true,
                    children: "Portal GIF"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Menu.Menu, {
                position: "right",
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Menu.Item, {
                    className: connected ? (Navbar_module_default()).text_color_menu_on : (Navbar_module_default()).text_color_menu_off,
                    name: connected ? "Conectado" : "Desconectado"
                })
            })
        ]
    });
};
/* harmony default export */ const components_Nav = (Nav);

;// CONCATENATED MODULE: ./src/components/Layout.tsx



const Layout = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: "Portal GIF"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Nav, {}),
            props.children
        ]
    });
};
/* harmony default export */ const components_Layout = (Layout);


/***/ }),

/***/ 4301:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "M": () => (/* binding */ SolanaHelper)
});

// EXTERNAL MODULE: external "rxjs"
var external_rxjs_ = __webpack_require__(1964);
;// CONCATENATED MODULE: ./src/idls/gif_project.json
const gif_project_namespaceObject = JSON.parse('{"version":"0.1.0","name":"gif_project","instructions":[{"name":"initialize","accounts":[{"name":"baseAccount","isMut":true,"isSigner":true},{"name":"user","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[]},{"name":"addGif","accounts":[{"name":"baseAccount","isMut":true,"isSigner":false},{"name":"user","isMut":true,"isSigner":true}],"args":[{"name":"gifLink","type":"string"}]},{"name":"voteGif","accounts":[{"name":"baseAccount","isMut":true,"isSigner":false}],"args":[{"name":"indexGif","type":"u16"}]}],"accounts":[{"name":"BaseAccount","type":{"kind":"struct","fields":[{"name":"totalGifs","type":"u64"},{"name":"gifList","type":{"vec":{"defined":"ItemStruct"}}}]}}],"types":[{"name":"ItemStruct","type":{"kind":"struct","fields":[{"name":"gifLink","type":"string"},{"name":"userAddress","type":"publicKey"},{"name":"votes","type":"u128"}]}}],"metadata":{"address":"8AHx4FJEq4dya3mBHdBajfpTL69MRjUTzzpD8Dwm9uR"}}');
// EXTERNAL MODULE: external "@solana/web3.js"
var web3_js_ = __webpack_require__(7831);
// EXTERNAL MODULE: external "@project-serum/anchor"
var anchor_ = __webpack_require__(1024);
;// CONCATENATED MODULE: ./src/keypair.json
const keypair_namespaceObject = JSON.parse('{"_":{"r":{"0":0,"1":30,"2":254,"3":54,"4":40,"5":150,"6":209,"7":186,"8":0,"9":120,"10":165,"11":192,"12":31,"13":23,"14":235,"15":95,"16":177,"17":123,"18":71,"19":118,"20":173,"21":90,"22":207,"23":238,"24":128,"25":7,"26":188,"27":120,"28":190,"29":15,"30":122,"31":254,"32":0,"33":73,"34":216,"35":174,"36":69,"37":228,"38":180,"39":77,"40":81,"41":86,"42":108,"43":137,"44":206,"45":249,"46":25,"47":123,"48":147,"49":245,"50":29,"51":38,"52":30,"53":89,"54":48,"55":183,"56":208,"57":132,"58":112,"59":165,"60":132,"61":221,"62":172,"63":208}}}');
;// CONCATENATED MODULE: ./src/helpers/solana_helper.ts





class SolanaHelper {
    web3Objects = new external_rxjs_.BehaviorSubject({
        connected: false,
        solanaWallet: undefined
    });
    constructor(){
        this._systemProgram = anchor_.web3.SystemProgram;
        this._baseAccount = this.getBaseAccount();
        this._programID = new web3_js_.PublicKey(gif_project_namespaceObject.metadata.address);
        this._network = (0,web3_js_.clusterApiUrl)("devnet");
        this._opts = {
            preflightCommitment: "processed"
        };
    }
    async init(solana) {
        this._solana = solana;
        const connection = new web3_js_.Connection(this._network, this._opts.preflightCommitment);
        this._provider = new anchor_.AnchorProvider(connection, solana, this._opts.preflightCommitment);
        this._solanaWallet = await solana.connect();
        this.web3Objects.next({
            connected: true,
            solanaWallet: this._solanaWallet
        });
        this._program = this.getProgram();
    }
    static get Instance() {
        return this._instance || (this._instance = new SolanaHelper());
    }
    // public async createGifAccount() {
    //   await this._program.methods
    //     .initialize()
    //     .accounts({
    //       baseAccount: this._baseAccount.publicKey,
    //       user: this._provider.wallet.publicKey,
    //       systemProgram: this._systemProgram.programId,
    //     })
    //     .signers([this._baseAccount])
    //     .rpc();
    //   console.log(
    //     "BaseAccount criado com sucesso com o endereço :",
    //     this._baseAccount.publicKey.toString()
    //   );
    // }
    async addGif(url) {
        await this._program.methods.addGif(url).accounts({
            baseAccount: this._baseAccount.publicKey,
            user: this._provider.wallet.publicKey
        }).rpc();
        console.log("GIF enviado com sucesso para o programa", url);
    }
    async voteGif(index) {
        await this._program.methods.voteGif(index).accounts({
            baseAccount: this._baseAccount.publicKey
        }).rpc();
    }
    async getGifList() {
        return await this._program.account.baseAccount.fetch(this._baseAccount.publicKey);
    }
    get GetProvider() {
        if (this._solana) {
            return this._provider;
        } else {
            throw "Init not called yet!";
        }
    }
    get SolanaWallet() {
        if (this._solana) {
            return this._solanaWallet;
        } else {
            throw "Init not called yet!";
        }
    }
    getBaseAccount() {
        const arr = Object.values(keypair_namespaceObject._.r);
        const secret = new Uint8Array(arr);
        return anchor_.web3.Keypair.fromSecretKey(secret);
    }
    getProgram() {
        return new anchor_.Program(gif_project_namespaceObject, this._programID, this._provider);
    }
}


/***/ })

};
;