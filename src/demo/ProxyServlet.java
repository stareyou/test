package demo;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

@WebServlet(name = "proxy", urlPatterns = {"/proxy/*"})
public class ProxyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ProxyServlet() {
        super();
    }

    private String download(HttpServletRequest request) {
    	String result = null;
    	CloseableHttpClient httpclient = HttpClients.createDefault();  
        try {  
        	String path = "http://202.98.157.41:2015/7lego.Mobile.WebAPI/" + request.getQueryString();
            HttpGet httpget = new HttpGet(path);  
            CloseableHttpResponse response = httpclient.execute(httpget);  
            try {   
                HttpEntity entity = response.getEntity();  
                System.out.println(response.getStatusLine());  
                if (entity != null) {  
                    System.out.println("Response content length: " + entity.getContentLength());  
                    // ��ӡ��Ӧ����    
                    result = EntityUtils.toString(entity);
                    System.out.println("Response content: " + result);
                }  
                System.out.println("------------------------------------");  
            } finally {  
                response.close();  
            }  
        } catch (ClientProtocolException e) {  
            e.printStackTrace();  
        } catch (ParseException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
            try {  
                httpclient.close();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }
		return result;  
    }  
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// url: 'http://localhost:9098/CrossDomainKillerDemo/proxy?user=' + data.id,
		// Query string: user=I042416
		System.out.println("Query string: " + request.getQueryString());
		//System.out.println("Query string: " + request.getParameterValues(""));
		
		
		response.getWriter().append("Context Path: ").append(request.getContextPath());
		response.getWriter().append("\n");
		
		// complete: http://localhost:8080/CrossDomainKillerDemo/proxy?user=I042416
		// printed: user=I042416
		response.getWriter().append("Query String: ").append(request.getQueryString());
		response.getWriter().append("\n");
		
		response.getWriter().append(download(request));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
