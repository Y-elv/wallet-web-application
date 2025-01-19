package com.utils;

import com.models.Transaction;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.services.AccountService;  // Assume this service exists
import com.services.UserService;    // Assume this service exists

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Date;
import java.util.List;

public class PdfReportUtil {

    // Static references to services (you might want to inject these via Spring)
    private static AccountService accountService;
    private static UserService userService;

    public static ByteArrayInputStream generateTransactionsReport(List<Transaction> transactions) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfDocument pdfDocument = new PdfDocument(new PdfWriter(out));
        Document document = new Document(pdfDocument);

        // Add a title to the document
        Paragraph title = new Paragraph("Transactions Report")
                .setTextAlignment(TextAlignment.CENTER)
                .setFontSize(20)
                .setUnderline();  // Underline the title text
        document.add(title);

        // Add generation date
        String generationDate = "Report Generated On: " + new Date().toString();
        document.add(new Paragraph(generationDate).setFontSize(12).setTextAlignment(TextAlignment.RIGHT));

        // Add space before the table
        document.add(new Paragraph("\n"));

        // Create a table with 5 columns and set its width to 100% of the page
        Table table = new Table(UnitValue.createPercentArray(new float[]{2, 2, 2, 2, 2}));
        table.setWidth(UnitValue.createPercentValue(100));

        // Add headers to the table
        table.addHeaderCell(new Cell().add(new Paragraph("Account Name")).setBackgroundColor(ColorConstants.GREEN));
        table.addHeaderCell(new Cell().add(new Paragraph("User Name")).setBackgroundColor(ColorConstants.GREEN));
        table.addHeaderCell(new Cell().add(new Paragraph("Date")).setBackgroundColor(ColorConstants.GREEN));
        table.addHeaderCell(new Cell().add(new Paragraph("Transaction Type")).setBackgroundColor(ColorConstants.GREEN));
        table.addHeaderCell(new Cell().add(new Paragraph("Amount")).setBackgroundColor(ColorConstants.GREEN));

        // Add transactions data to the table
        for (Transaction transaction : transactions) {
            String accountName = accountService.getAccountNameById(transaction.getAccountId());
            String userName = userService.getUserNameById(transaction.getUserId());

            table.addCell(new Cell().add(new Paragraph(accountName)).setTextAlignment(TextAlignment.LEFT));
            table.addCell(new Cell().add(new Paragraph(userName)).setTextAlignment(TextAlignment.LEFT));
            table.addCell(new Cell().add(new Paragraph(transaction.getDate().toString())).setTextAlignment(TextAlignment.LEFT));
            table.addCell(new Cell().add(new Paragraph(transaction.getType().toString())).setTextAlignment(TextAlignment.LEFT));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(transaction.getAmount()))).setTextAlignment(TextAlignment.RIGHT));
        }

        // Ensure the last row is completed
        int numColumns = 5;
        int currentColumnCount = transactions.size() % numColumns;
        if (currentColumnCount != 0) {
            for (int i = currentColumnCount; i < numColumns; i++) {
                table.addCell(new Cell());
            }
        }

        // Add the table to the document
        document.add(table);

        // Close the document
        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }

    // Assume these setter methods are called by Spring to inject the services
    public static void setAccountService(AccountService accountService) {
        PdfReportUtil.accountService = accountService;
    }

    public static void setUserService(UserService userService) {
        PdfReportUtil.userService = userService;
    }
}