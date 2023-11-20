import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
// import { ExportAllService } from '../export-all.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';

import html2canvas from 'html2canvas';




@Component({
  selector: 'app-admission-enquiry',
  templateUrl: './admission-enquiry.component.html',
  styleUrls: ['./admission-enquiry.component.css']
})

export class AdmissionEnquiryComponent implements OnInit {

  myReactiveForm: FormGroup; // Declare the form group
  myPopupForm: FormGroup;
  showPopup = false;
  adminssionEnquiry: any[] = [];
  searchText: String = '';
  records: any[] = [];  // Your data structure
  currentPage: number = 1;
  showpopup: boolean;
  exportSerrive: any;
  data: any;
  excel = [];
  isUpdating: boolean = false;
  // currentPage: number = 1; // Current page
  totalPages: number = 5; // Total number of pages
  dataToCopy: string; // Define the property




  recordsPerPage: number = 5; // Number of records to show per page



  constructor(private formBuilder: FormBuilder, private UserService: UserService
  ) {
    this.myPopupForm = this.formBuilder.group({

      id: [''],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: [''],
      address: [''],
      description: [''],
      note: [''],
      nextFollowUpDate: [''],
      enquiryDate: [''],
      assigned: [''],
      reference: [''],
      source: ['', Validators.required],
      class: [''],
      status: [''],
      no_of_child: ['']
    });
    this.fetchData(this.currentPage);
  }



  ngOnInit(): void {
    // Initialize the form group and define form controls with validators
    this.myReactiveForm = this.formBuilder.group({
      enquiryDate: ['', Validators.required], // Example control with a required validator
      source: ['', Validators.required],
      nextFollowUpDate: [''],
      // enquiryDate: [''],
      status: ['']

    });
    // this.adminssionEnquiryArray = Object.values(this.adminssionEnquiry);
    this.getAllEnquiry()

  }



  customFilter(data: any): boolean {
    if (!this.searchText) {
      return true;
    }
    this.searchText = this.searchText.toLowerCase();

    // Check if the 'id' or 'name' contains the search text
    return (
      data.id.toString().includes(this.searchText) || data.name.toLowerCase().includes(this.searchText)
    );
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Function to navigate to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }



  addPopup() {
    this.openPopup();
    this.isUpdating = false;


  }
  closePopup() {
    this.showPopup = false;
  }
  openPopup() {
    this.showPopup = true;
    // this.isUpdating = true;
  }
  onSubmit() {
    console.log(this.myPopupForm.value);
    this.UserService.addEnquiry(this.myPopupForm.value).subscribe(

      (res: any) => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Save Data Successfully...',
          timer: 2000
        });
        this.getAllEnquiry();

      });


  }
  getAllEnquiry() {
    this.UserService.getAllEnquiry().subscribe(res => {
      console.log(res);
      this.adminssionEnquiry = res
      console.log("adminssionEnquiry", this.adminssionEnquiry)

    })


  }
  updateButton() {
    const id = this.myPopupForm.value.id;
    const body = this.myPopupForm.value;
    console.log(this.myPopupForm.value)
    this.UserService.updateEnquiryById(id, body).subscribe((res: any) => {

      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Update Data Successfully...',
        timer: 2000
      });
      this.getAllEnquiry();
      this.isUpdating = false;
      this.myPopupForm.reset();
      this.showPopup = false;
      

    }, err => {
      console.log(err)
      this.isUpdating = false;
      this.myPopupForm.reset();

    })
  }



  edit(id: string) {
    this.isUpdating = true;
    this.openPopup()
    this.UserService.getsingelenquiry(id).subscribe((res: any) => {
      // console.log(res);
      // this.adminssionEnquiry = res
      const enquiry = res.messges
      this.myPopupForm.patchValue(enquiry)
      // console.log("singelRecordEnquiry", enquiry)
      this.myPopupForm.patchValue({ id: id })

    })

  }


  delete(id: any) {
    this.UserService.deleteEnquiryById(id).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Deleted Successfully...',
        timer: 2000
      });
      this.getAllEnquiry();
    });
  }
  print(data: any): void {
    // Create a new window to hold the content for printing
    const printWindow = window.open('', '_blank', 'width=600,height=600');

    if (printWindow) {
      // Customize the table HTML as needed
      const tableData = this.adminssionEnquiry.map(enquiry => `
        <tr>
          <td>${enquiry.id}</td>
          <td>${enquiry.name}</td>
          <td>${enquiry.contact}</td>
          <td>${enquiry.source}</td>
          <td>${enquiry.enquiryDate}</td>
          <td>${enquiry.nextFollowUpDate}</td>
          <td>${enquiry.status}</td>
        </tr>
      `);


      // Construct the HTML for the print window
      const printContent = `
        <html>
          <head>
            <title>Enquiry Data</title>
          </head>
          <body>
            <h1>Enquiry Data</h1>
            <table border="1">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Source</th>
                <th>Enquiry Date</th>
                <th>Next Follow-Up Date</th>
                <th>Status</th>
              </tr>
              ${tableData.join('')}
            </table>
          </body>
        </html>
      `;

      // Set the HTML content of the print window
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Print the content in the new window
      printWindow.print();

      // Close the print window after printing
      printWindow.close();
    }
  }




  view(id: string) {

  }

  phoneAction() {
    this.showpopup = true;
  }
  closePopu() {
    this.showpopup = false;
  }
  follow_save() {
    this.showpopup
  }

  fetchData(page: number) {
    // Fetch records for the specified page from your data source
    // Update this.records with the fetched data
  }

  exportexcel(): void {
    const tableColumns = ['ID', 'Name', 'Contact', 'Source', 'Enquiry Date', 'Next Follow-Up Date', 'Status'];
    const tableData = this.adminssionEnquiry.map(data => [
      data.id,
      data.name,
      data.contact,
      data.source,
      data.enquiryDate,
      data.nextFollowUpDate,
      data.status
    ]);
    // Create a new worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([tableColumns, ...tableData]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Enquiry Data');
    // Generate XLSX data as a Blob
    XLSX.writeFile(wb, 'enquiry_data.xlsx');
  }


  copyDataToClipboard(): void {
    const textDataToCopy = 'This is the data you want to copy to the clipboard';

    const tableColumns = ['ID', 'Name', 'Contact', 'Source', 'Enquiry Date', 'Next Follow-Up Date', 'Status'];
    const tableRows = this.adminssionEnquiry.map(data => [
      data.id,
      data.name,
      data.contact,
      data.source,
      data.enquiryDate,
      data.nextFollowUpDate,
      data.status
    ]);

    // Combine the text and table data
    const combinedDataToCopy = textDataToCopy + '\n\n' + tableColumns.join('\t') + '\n' + tableRows.map(row => row.join('\t')).join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(combinedDataToCopy).then(() => {
        alert('Data copied to clipboard!');
      }).catch((error) => {
        console.error('Copy failed:', error);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = combinedDataToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Data copied to clipboard!');
    }
    console.log('Copying data:', combinedDataToCopy);
  }






  exportCsv() {
    const headers = ['ID', 'Name', 'Contact', 'Source', 'Enquiry Date', 'Next Follow-Up Date', 'Status'];
    const tableData = this.adminssionEnquiry.map(data => [
      data.id,
      data.name,
      data.contact,
      data.source,
      data.enquiryDate,
      data.nextFollowUpDate,
      data.status
    ]);
    const csvData = [headers, ...tableData];
    const csvContent = csvData.map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv'; // Specify the file name
    a.click();
    window.URL.revokeObjectURL(url);
  }



  exportColumnChoose() {
    console.log('exportColumnChoose');
  }


  exportPdf(): void {
  
    let DATA: any = document.getElementById('enquirytable');
    // DATA.querySelector("th:last-child").remove(); //removing view Button
    // let a :any = document.querySelectorAll('.viewbtn')
    // for (let el of a) el.style.display = 'none';
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4'); 
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Report.pdf');
      // for (let el of a) el.style.display = 'block';
    });
  }







}