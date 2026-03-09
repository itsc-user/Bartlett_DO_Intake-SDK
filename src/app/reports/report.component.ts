import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Buffer } from 'buffer';
import {
  CoreBase,
  IMIRequest,
  IMIResponse,
  MIRecord,
  IIonApiRequest,
  IIonApiResponse,
  IUserContext,
} from '@infor-up/m3-odin';
import {
  MIService,
  UserService,
  ApplicationService,
  IonApiService,
} from '@infor-up/m3-odin-angular';
import {
  SohoDataGridComponent,
  SohoMessageRef,
  SohoMessageService,
  SohoModalDialogService,
  SohoToastService,
} from 'ids-enterprise-ng';
import { InteractionService } from '../interaction.service';
import { DatePipe } from '@angular/common';
import { DataService } from '../data.service';
import { GlobalStore } from '../../store/global-store';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [DatePipe],
})
export class ReportComponent extends CoreBase implements OnInit {
  //
  pValue = false;
  curdivi: string;
  respGetPO: IMIResponse;
  respGR0041: any;
  respGetFreight: IMIResponse;
  respGetFreight01: IMIResponse;
  respGetFreight02: IMIResponse;
  iRIDN: string;
  iDLIX: string;
  iWGHT: any;
  iBOXS: any;
  iRVQA: string;
  oWHLO: any;
  oSUNO: any;
  iITNO: string;
  iBANO: string;
  iSize: number;
  oCAMU: any;
  countx: number;
  iRIDL: string;
  oEND: any;
  respFR003Q: IMIResponse;
   respFR005: IMIResponse;
  //

  cUCA4(event: any) {
    //   input.setString('AL20', event.target.value);

    this.iBOXS = event.target.value;
  }

  cUCA3(event: any) {
    this.iWGHT = event.target.value;
  }

  lFACI: string;
  lWHLO: string;
  wWHLO: any;
  wFACI: any;
  dUDN4: number;
  isReadOnly = false;

  drillback_PO() {
    this.applicationService.launch(
      'bookmark?program=PPS200&startPanel=B&includeStartPanel=True&tableName=MPHEAD&sortingOrder=1&source=MForms&view=STD0101&requirePanel=True&keys=IACONO%2C' +
        this.curcono +
        '%2CIAPUNO%2C' +
        this.iPO +
        '&fields=WFSLCT%2C%2520%2CWTSLCT%2C%2520%2CWFSLC2%2C%2520%2CWTSLC2%2C%2520%2CWFSLC3%2C%2520%2CWTSLC3%2C%2520%2CW1OBKV%2C' +
        this.iPO +
        '%2CW2OBKV%2C%2520&LogicalId=lid://infor.m3.m3'
    );
  }
  iPO: any;

  oUCA6: any;
  iUDN3: any;
  iUDN5: any;
  iUDN4: any;
  showPO = false;

  oUCA4: string;
  iSUNM: any;
  iSUNO: string;
  iUMS: any;
  respFR001: IMIResponse;
  oMSGN: number;
  respFR002: IMIResponse;
  respFR003: IMIResponse;
  respFR004: IMIResponse;
  oPUNO: any;

  oUCA5: any;
  iUCA6: any;

  iUCA5: any;

  oUCA3: any;
  iUCA3: any;
  iUCA4: any;

  qBANO: any;

  newlotno: string;
  qMSEQ: any;
  respGR0021a: unknown;
  respGR001Z: IMIResponse;
  oCombined: string;
  MMITDS: any;
  qCAMU: any;

  lotexists = false;
  acamu = false;

  processing = false;

  alerts: any[] = [];
  ALLOK: any;
  xBANO: any;
  attra: any[] = [];
  attrb: any[] = [];
  samea: boolean;

  xATNR: any;
  iPLGR: any;
  iWCLN: any;
  sWCLN: any;
  currentCompany: any;
  currentDivision: any;

  iTWSL: string;
  iPRNO: any;
  iMFNO: any;
  iRPQA: any;
  iWHSL: any;
  FACI: string;
  respGR001: IMIResponse;
  respGR002: IMIResponse;
  respGR003: IMIResponse;
  WHLO: any;
  respGR004: IMIResponse;
  respGR005: IMIResponse;
  respGR006: IMIResponse;
  respGR0021: IMIResponse;

  reqstock: number;
  posstock = false;
  negstock = false;

  oAVAP: any;

  linkedMO = true;
  linkedLot = false;
  negative = false;

  cBANO(event: any) {}

  sWHST: any;
  sWHHS: any;

  dialog?: SohoMessageRef;
  sWMST: any;
  qMTNO: any;
  qCNQT: any;
  itemsbano: any[] = [];

  openError02(errormessage) {
    const buttons = [
      {
        text: 'Close',
        click: (_e: any, modal: any) => {
          modal.close(true);
          (this.dialog as any) = null;
        },
        isDefault: true,
      },
    ];

    this.dialog = this.messageService
      .error()
      .title('<span>Info</span>')
      .message(errormessage)
      .buttons(buttons)
      .beforeOpen(() => {
        console.log('before open');
        return true;
      })
      .beforeClose(() => {
        console.log('before close');
        return true;
      })
      .open();
  }

  iCFI1: any;
  iCFI2: any;
  workcenter: any;
  iCFI1a: any;
  faci: string;

  unconnected: boolean;
  oCUCL: any;
  oRORN: any;
  oMAQA: any;
  oRVQA: any;
  oORQA: any;
  qPRNO: any;
  qITDS: any;
  oAVAL: any;

  placeholder: ViewContainerRef;
  oBANO: any;
  sITDS: any;

  @ViewChild('ReportDatagrid') datagrid: SohoDataGridComponent;

  datagridOptions: SohoDataGridOptions;
  items: any[] = [];
  detailItem: any;
  hasSelected: boolean;
  isBusy = false;
  isDetailBusy = false;
  sum: number;
  reportstatus: string;

  private maxRecords = 10000;
  private pageSize = 20;

  private DWDTfrom = '00000000';
  private DWDTto = '99999999';
  private PLDTfrom = '00000000';
  private PLDTto = '99999999';
  private PUDTfrom = '00000000';
  private PUDTto = '99999999';

  input01: string;
  items001: any[] = [];
  items002: any[] = [];
  poresult: any[] = [];
  poresult15: any[] = [];
  poresult20: any[] = [];
  poresult40: any[] = [];
  poresult75: any[] = [];
  poresult85: any[] = [];
  selitem: any;
  iPNLI: any;
  iPONO: any;
  status01s: string;
  status02s: string;
  poresult20L: any[];
  poresult40L: any[];
  poresult75L: any[];
  poresult85L: any[];
  items004: any[] = [];
  poresult2: any[];
  items005: any[] = [];
  poresult3: any[];
  season: string;
  supplier01: string;
  planfrom: string;
  planto: string;
  reqfrom: string;
  reqto: string;
  planfromO: string;
  plantoO: string;
  reqfromO: string;
  reqtoO: string;
  items006: any[] = [];
  poresult4: any[] = [];

  myDate = new Date();
  curdate01: string;
  curtime01: string;
  curtimestamp: string;
  today: number = Date.now();
  curdatexx1: number;
  curdatel: string;
  curdatem: string;

  api001: string;
  api002: string;
  api003: string;
  api004: string;
  api005: string;
  ordfromO: string;
  ordfrom: any;
  ordto: string;
  ordtoO: string;
  items100: any[] = [];
  items001F: any[] = [];
  items002F: any[] = [];
  items003F: any[] = [];
  items004F: any[] = [];
  items005F: any[] = [];
  poresult2f: any[] = [];
  poresult3f: any[] = [];
  poresult4f: any[] = [];
  poresultf: any[] = [];
  items001FG: any = [];
  items002FG: any = [];
  items003FG: any = [];
  items004FG: any = [];
  items005FG: any = [];
  items001T: any = [];
  Items001T: any[];
  text: string;
  puno: any;
  pnli: any;
  potext01: string;
  potextarr: any = [];
  phead: any;
  pline: any;
  poheadT: any;
  polinT: any;
  potextarr1: any = [];
  curcono: string;
  fromord: number;
  toord: number;
  ordfromN: number;
  ordtoN: number;
  index: any;
  queryid: number;
  queryId: any;
  querystatus: string;
  curstatus: string;
  currows: string;
  puno1: string;
  PUNO1: string;
  result001: any = [];
  resultset: any = [];
  body01: any;
  polines: any = [];
  subr01: string;
  items001x01: any = [];
  iREPN: any;
  iWHLO: any;
  iCUNO: any;
  userContext = {} as IUserContext;
  nvalue: any;
  nta3: any;
  count: number;
  TX15: any;
  STKY: any;
  AITM: any;

  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:variable-name
  constructor(
    private toastService: SohoToastService,
    private dataService: DataService,
    private ionApiService: IonApiService,
    private datePipe: DatePipe,
    private globalStore: GlobalStore,
    private _interactionService: InteractionService,
    private modalService: SohoModalDialogService,
    private miService: MIService,
    private userService: UserService,
    private messageService: SohoMessageService,
    private applicationService: ApplicationService
  ) {
    super('ReportComponent');

    this.userService.getUserContext().subscribe(
      (userContext: IUserContext) => {
        this.userContext = userContext;
        const lang = userContext.currentLanguage;
        const divi = userContext.currentDivision;
        this.curcono = userContext.currentCompany;
        this.curdivi = userContext.currentDivision;
        const usid = userContext.USID;
      },
      (errorContext: IUserContext) => {
        // Handle error
      }
    );
  }

  async ngOnInit() {
    this.items001x01 = [];

    this.iRVQA = localStorage.getItem('D015');
    this.iDLIX = localStorage.getItem('D016');
    this.iWHLO = localStorage.getItem('D017');
    this.iRIDN = localStorage.getItem('D018');

    this.iITNO = localStorage.getItem('D019');
    this.iWHSL = localStorage.getItem('D020');
    this.iBANO = localStorage.getItem('D021');
    this.iRIDL = localStorage.getItem('D022');

    console.log(
      'sew ' +
        this.iRVQA +
        ' ' +
        this.iDLIX +
        ' ' +
        this.iWHLO +
        ' ' +
        this.iRIDN
    );

    this.globalStore.setFACI(this.FACI);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async createPallets() {
  this.toastService.show({ title: 'Pallets being created.', message: '' });

  // ✅ Integer pallet logic:
  // Example: total 300, boxes 7 => base 42, remainder 6 => last pallet 48
  const baseWeight = Math.floor(this.iWGHT / this.iBOXS);
  const remainder = this.iWGHT - baseWeight * this.iBOXS;

  console.log(
    'baseWeight=' + baseWeight + ' remainder=' + remainder + ' total=' + this.iWGHT + ' pallets=' + this.iBOXS
  );

  // Get latest container number
  try {
    this.respFR001 = await lastValueFrom(this.dataService.GetCAMU(this.iBANO));
    for (let b = 0; b < this.respFR001.items.length; b++) {
      const item = this.respFR001.items[b];
      this.oCAMU = item.NBNR;
    }
  } catch (error) {}

  // Get DO info
  try {
    this.respFR001 = await lastValueFrom(this.dataService.GetDO(this.iRIDN));
    for (let b = 0; b < this.respFR001.items.length; b++) {
      const item = this.respFR001.items[b];
      this.oSUNO = item.WHLO;
    }
  } catch (error) {}

  // Create warehouse header
  try {
    this.respFR001 = await lastValueFrom(this.dataService.DO001(this.iWHLO));
    for (let b = 0; b < this.respFR001.items.length; b++) {
      const item = this.respFR001.items[b];
      this.oMSGN = item.MSGN;
    }
  } catch (error) {}

  // Create warehouse pack
  try {
    this.respFR002 = await lastValueFrom(
      this.dataService.DO002(this.iWHLO, this.oMSGN, this.oSUNO)
    );
    for (let b = 0; b < this.respFR002.items.length; b++) {
      const item = this.respFR002.items[b];
      this.oMSGN = item.MSGN;
    }
  } catch (error) {}

  // Create warehouse lines (pallets)
  this.countx = 0;
  for (let c = 0; c < this.iBOXS; c++) {
    this.countx++;

    const suffix = String(c + 1).padStart(2, '0');

    // ✅ Only set END flag on last iteration
    this.oEND = c === this.iBOXS - 1 ? '1' : '0';

    // ✅ Set integer pallet weight:
    // - all pallets get baseWeight
    // - last pallet gets baseWeight + remainder
    this.iSize = c === this.iBOXS - 1 ? baseWeight + remainder : baseWeight;

    try {
      this.respFR003 = await lastValueFrom(
        this.dataService.DO003(
          this.iWHLO,
          this.oMSGN,
          this.iITNO,
          this.iBANO,
          this.iWHSL,
          this.iSize,
          this.oCAMU + '-' + suffix,
          this.iRIDN,
          this.iDLIX,
          this.countx,
          this.iRIDL,
          this.oEND
        )
      );

      // (keeping your pattern, but corrected to use respFR003)
      for (let b = 0; b < this.respFR003.items.length; b++) {
        const item = this.respFR003.items[b];
        this.oMSGN = item.MSGN;
      }
    } catch (error) {}
  }

  // Process warehouse transaction
  try {
    this.respFR003 = await lastValueFrom(this.dataService.DO004(this.oMSGN));
  } catch (error) {}

  // ✅ Wait 2 seconds to ensure the transaction has finalized
  await this.sleep(2000);

  try {
    this.respFR003Q = await lastValueFrom(
      this.dataService.DO005(this.oSUNO, this.iRIDN)
    );

    for (let b = 0; b < this.respFR003Q.items.length; b++) {
      const item = this.respFR003Q.items[b];
      this.oBANO = item.MTBANO;
      this.oCAMU = item.MTCAMU;
    }
  } catch (error) {}

  // Process quick inventory
  try {
    this.respFR005 = await lastValueFrom(
      this.dataService.DO006(
        this.oSUNO,
        this.iITNO,
        '*=>' + this.iWHLO,
        this.oBANO
      )
    );
  } catch (error) {}

  this.toastService.show({
    title: 'Pallets have been created.',
    message: '',
  });
}

}
